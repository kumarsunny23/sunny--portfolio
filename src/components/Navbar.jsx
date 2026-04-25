import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import ThemeToggle from './ThemeToggle';
import useSound from '../hooks/useSound';
import { personalInfo } from '../data/portfolioData';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';

const navLinks = [
  { label: 'About',         to: 'about' },
  { label: 'Skills',        to: 'skills' },
  { label: 'Projects',      to: 'projects' },
  { label: 'Resume',        to: 'resume' },
  { label: 'Education',     to: 'education' },
  { label: 'Certifications',to: 'certifications' },
  { label: 'Contact',       to: 'contact' },
];

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [active,      setActive]      = useState('hero');
  const playClick = useSound();

  /* ── scroll handler ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── close drawer on resize to desktop ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLink = (to) => {
    playClick();
    setActive(to);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ════ NAV BAR ════ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-[9000]"
        style={{
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl transition-all duration-300 px-6 py-3 ${scrolled ? 'glass-strong' : 'glass'}`}
        >

          {/* ── Logo ── */}
          <Link
            to="hero"
            smooth
            spy
            className="flex items-center gap-2.5 cursor-none flex-shrink-0"
            onClick={() => handleLink('hero')}
          >
            <motion.div
              whileHover={{ rotate: 8, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
            >
              SK
            </motion.div>
            <span
              className="font-bold text-base hidden sm:block font-sans text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-sm whitespace-nowrap"
            >
              Sunny Kumar
            </span>
          </Link>

          {/* ── Desktop links (lg+) ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                spy
                offset={-80}
                onSetActive={() => setActive(link.to)}
                onClick={() => handleLink(link.to)}
                className="relative cursor-none"
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 font-sans ${active === link.to ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
                >
                  {link.label}
                  {/* Active dot */}
                  {active === link.to && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400"
                    />
                  )}
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />

            {/* Resume download — md+ */}
            <motion.a
              href={personalInfo.resumeUrl}
              download
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={playClick}
              className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-white cursor-none bg-gradient-to-r from-purple-600 to-cyan-600 px-5 py-2.5 rounded-xl shadow-[0_0_16px_rgba(124,58,237,0.35)] whitespace-nowrap font-sans"
            >
              <FaDownload size={12} /> Resume
            </motion.a>

            {/* Hamburger — hidden on lg+ */}
            <motion.button
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center cursor-none bg-purple-500/15 border border-purple-500/30"
              onClick={() => { playClick(); setMobileOpen(v => !v); }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <FaTimes size={16} className="text-purple-300" />
                    </motion.div>
                  : <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <FaBars size={16} className="text-purple-300" />
                    </motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ════ MOBILE DRAWER ════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[8997] bg-black/60"
              style={{ backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[8998] flex flex-col glass-strong border-l border-purple-500/20"
              style={{
                width: 'min(280px, 80vw)',
              }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}
                  >
                    SK
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#a78bfa' }}
                  >
                    Sunny Kumar
                  </span>
                </div>
                <button
                  onClick={() => { playClick(); setMobileOpen(false); }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center cursor-none"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}
                >
                  <FaTimes size={14} className="text-purple-300" />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 overflow-y-auto py-6 px-5 space-y-1">
                {/* Home link */}
                <Link
                  to="hero"
                  smooth
                  offset={-80}
                  onClick={() => handleLink('hero')}
                  className="cursor-none"
                >
                  <motion.div
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                    style={{
                      background: active === 'hero' ? 'rgba(124,58,237,0.15)' : 'transparent',
                      borderLeft: active === 'hero' ? '2px solid #7c3aed' : '2px solid transparent',
                    }}
                  >
                    <span
                      className={`font-semibold text-sm font-sans ${active === 'hero' ? 'text-purple-400' : 'text-gray-400'}`}
                    >
                      Home
                    </span>
                  </motion.div>
                </Link>

                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.05 }}
                  >
                    <Link
                      to={link.to}
                      smooth
                      offset={-80}
                      onClick={() => handleLink(link.to)}
                      className="cursor-none"
                    >
                      <motion.div
                        whileHover={{ x: 6 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                        style={{
                          background: active === link.to ? 'rgba(124,58,237,0.15)' : 'transparent',
                          borderLeft: active === link.to ? '2px solid #7c3aed' : '2px solid transparent',
                        }}
                      >
                        <span
                          className={`font-semibold text-sm font-sans ${active === link.to ? 'text-purple-400' : 'text-gray-400'}`}
                        >
                          {link.label}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="p-5 border-t border-white/5">
                <motion.a
                  href={personalInfo.resumeUrl}
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={playClick}
                  className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white cursor-none"
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
                    padding: '12px',
                    borderRadius: '12px',
                    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
                  }}
                >
                  <FaDownload size={13} /> Download Resume
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
