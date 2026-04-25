import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { personalInfo, typingRoles } from '../../data/portfolioData';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import useSound from '../../hooks/useSound';
import { fadeUp, staggerContainer } from '../../hooks/useScrollReveal';

const Hero = () => {
  const ref = useRef(null);
  const playClick = useSound();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const typingSequence = typingRoles.flatMap(r => [r, 2200]);

  const socials = [
    { icon: <FaGithub />, href: personalInfo.github, label: 'GitHub' },
    { icon: <FaLinkedin />, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: <FaTwitter />, href: personalInfo.twitter, label: 'Twitter' },
    { icon: <FaEnvelope />, href: `mailto:${personalInfo.email}`, label: 'Email' },
  ];

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Large glowing orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)' }} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y: textY, opacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">

          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <span className="px-5 py-2 rounded-full glass border border-purple-500/20 text-purple-300 text-sm font-medium tracking-widest cursive-text">
              ✨ Welcome to my portfolio
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={fadeUp} className="text-gray-400 text-xl mb-2 font-medium">
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-4 leading-none tracking-tight">
            <span className="gradient-text">Sunny Kumar</span>
          </motion.h1>

          {/* Typing */}
          <motion.div variants={fadeUp} className="text-xl sm:text-2xl font-semibold mb-6 text-gray-400">
            <TypeAnimation
              sequence={typingSequence}
              wrapper="span"
              repeat={Infinity}
              cursor
              style={{ color: '#a78bfa' }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {personalInfo.tagline} Based in{' '}
            <span className="text-cyan-400 font-semibold">{personalInfo.location}</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="projects" smooth offset={-80}>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={playClick}
                className="btn-primary cursor-none text-base"
              >
                <FiArrowDown /> View My Work
              </motion.button>
            </Link>
            <Link to="resume" smooth offset={-80}>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={playClick}
                className="btn-outline cursor-none text-base"
              >
                <FiDownload /> Download Resume
              </motion.button>
            </Link>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp} className="flex justify-center gap-4">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.25, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={playClick}
                className="w-12 h-12 rounded-2xl glass border border-white/8 flex items-center justify-center
                           text-gray-400 hover:text-white hover:border-purple-500/40
                           hover:shadow-[0_0_16px_rgba(124,58,237,0.4)] transition-all duration-200 cursor-none text-lg"
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-gray-600 text-[10px] tracking-[4px] font-mono uppercase">Scroll</span>
        <FiArrowDown className="text-purple-500" size={18} />
      </motion.div>
    </section>
  );
};

export default Hero;
