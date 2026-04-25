import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { fadeUp, fadeLeft, fadeRight, viewportOnce } from '../../hooks/useScrollReveal';
import {
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt,
  FaPaperPlane, FaCheckCircle
} from 'react-icons/fa';
import useSound from '../../hooks/useSound';

const Contact = () => {
  const playClick = useSound();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setStatus('loading');
    
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 4000);
  };

  const socials = [
    { icon: <FaGithub size={20} />, href: personalInfo.github, label: 'GitHub' },
    { icon: <FaLinkedin size={20} />, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: <FaTwitter size={20} />, href: personalInfo.twitter, label: 'Twitter' },
  ];
  const contactDetails = [
    { icon: <FaEnvelope />, label: 'Email', value: personalInfo.email },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: personalInfo.location },
  ];

  const inputCls = `w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm 
    placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-purple-500/5 
    focus:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all duration-300 cursor-text`;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <p className="text-purple-400 text-sm tracking-[4px] font-mono uppercase mb-3">Get In Touch</p>
          <h2 className="section-heading gradient-text">Contact Me</h2>
          <div className="section-divider mt-4" />
          <p className="text-gray-500 mt-5 max-w-xl mx-auto">Have a project or want to collaborate? Let's build something amazing together!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left info */}
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-6">
            {contactDetails.map((d) => (
              <motion.div key={d.label} whileHover={{ x: 6 }}
                className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5 card-hover">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-purple-400"
                  style={{ background: 'rgba(124,58,237,0.12)' }}>
                  {d.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{d.label}</p>
                  <p className="text-white text-sm font-medium">{d.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <div>
              <p className="text-gray-500 text-xs mb-4 uppercase tracking-wider">Find me on</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    aria-label={s.label} whileHover={{ scale: 1.2, y: -4 }} whileTap={{ scale: 0.9 }}
                    onClick={playClick}
                    className="w-12 h-12 rounded-xl glass border border-white/8 flex items-center justify-center
                               text-gray-400 hover:text-white hover:border-purple-500/40 transition-all cursor-none">
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <motion.div className="glass rounded-2xl p-5 border border-green-500/15"
              animate={{ borderColor: ['rgba(34,197,94,0.15)', 'rgba(34,197,94,0.4)', 'rgba(34,197,94,0.15)'] }}
              transition={{ duration: 2, repeat: Infinity }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <p className="text-green-400 font-semibold text-sm">Available for opportunities</p>
              </div>
              <p className="text-gray-500 text-xs">Open to full-time, freelance & open source. Reply within 24h.</p>
            </motion.div>
          </motion.div>

          {/* Right form */}
          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 border border-white/5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-400/80 text-xs mb-1.5 uppercase tracking-[3px] font-semibold">Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Aapka naam kya hai?" required className={inputCls} />
                </div>
                <div>
                  <label className="block text-purple-400/80 text-xs mb-1.5 uppercase tracking-[3px] font-semibold">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="aapka@email.com" required className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-purple-400/80 text-xs mb-1.5 uppercase tracking-[3px] font-semibold">Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange}
                  placeholder="Kya baat karna chahte hain?" className={inputCls} />
              </div>
              <div>
                <label className="block text-purple-400/80 text-xs mb-1.5 uppercase tracking-[3px] font-semibold">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  rows={5} placeholder="Apna project, idea ya koi bhi baat share karein..." required
                  className={`${inputCls} resize-none`} />
              </div>
              <motion.button type="submit" disabled={status === 'loading' || status === 'success'}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124,58,237,0.5)' }} 
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 cursor-none disabled:opacity-70 transition-all duration-300 text-sm tracking-wide shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                    Sending...
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center gap-2 text-green-300"><FaCheckCircle /> Message Sent!</span>
                ) : status === 'error' ? (
                  <span className="flex items-center gap-2 text-red-300">Failed to send. Try again</span>
                ) : (
                  <span className="flex items-center gap-2"><FaPaperPlane /> Send Message</span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
