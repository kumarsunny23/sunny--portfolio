import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { personalInfo } from '../../data/portfolioData';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import useSound from '../../hooks/useSound';

const Footer = () => {
  const playClick = useSound();
  const year = new Date().getFullYear();

  const navLinks = [
    { label: 'About', to: 'about' },
    { label: 'Skills', to: 'skills' },
    { label: 'Projects', to: 'projects' },
    { label: 'Resume', to: 'resume' },
    { label: 'Education', to: 'education' },
    { label: 'Contact', to: 'contact' },
  ];

  const socials = [
    { icon: <FaGithub size={16} />, href: personalInfo.github },
    { icon: <FaLinkedin size={16} />, href: personalInfo.linkedin },
    { icon: <FaTwitter size={16} />, href: personalInfo.twitter },
    { icon: <FaEnvelope size={16} />, href: `mailto:${personalInfo.email}` },
  ];

  return (
    <footer className="relative border-t border-white/5 pt-12 pb-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-24 relative">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>SK</div>
              <span className="font-bold text-lg gradient-text">{personalInfo.name}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Full Stack MERN Developer crafting beautiful, scalable web experiences.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} smooth offset={-80} onClick={playClick}
                    className="text-gray-500 hover:text-purple-400 text-sm cursor-none transition-colors">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3 mb-4">
              {socials.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer"
                  onClick={playClick} whileHover={{ scale: 1.2, y: -3 }}
                  className="w-9 h-9 rounded-lg glass border border-white/8 flex items-center justify-center
                             text-gray-400 hover:text-white hover:border-purple-500/40 transition-all cursor-none">
                  {s.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-gray-600 text-sm">{personalInfo.email}</p>
            <p className="text-gray-600 text-sm">{personalInfo.location}</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            © {year} {personalInfo.name}. Made with{' '}
            <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <FaHeart className="text-pink-500" size={13} />
            </motion.span>
            {' '}& lots of ☕
          </p>
          <Link to="hero" smooth>
            <motion.button whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }}
              onClick={playClick}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-400 transition-colors cursor-none">
              Back to top <FaArrowUp size={12} />
            </motion.button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
