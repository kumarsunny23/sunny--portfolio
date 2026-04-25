const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// Helper: Simple Email Validation
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
};

// POST a new message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log('📩 Received:', { name, email, subject, message: message?.slice(0, 30) });
    
    // 1. Validations
    if (!name || !email || !message) {
      console.log('❌ Missing fields:', { name: !!name, email: !!email, message: !!message });
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    if (!validateEmail(email)) {
      console.log('❌ Invalid email:', email);
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    if (message.trim().length < 5) {
      console.log('❌ Message too short:', message.length);
      return res.status(400).json({ error: 'Message is too short (min 5 characters)' });
    }

    // 2. Save to MongoDB
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // 3. Send Email Notification via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Message from Portfolio: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #7c3aed; border-radius: 10px;">
          <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <hr/>
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Server Error. Could not send message.' });
  }
});

// GET all messages (for admin view, if needed later)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server Error. Could not fetch messages.' });
  }
});

module.exports = router;
