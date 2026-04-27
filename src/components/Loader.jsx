import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileImg from '../assets/reaper.jpg';
import folderIcon from '../assets/folder-icon.png';

/* ── Screen-breaking crack SVG paths ── */
const CrackPaths = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1000 1000"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ zIndex: 10 }}
  >
    <defs>
      <linearGradient id="crackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#000000" stopOpacity="1" />
      </linearGradient>
      <filter id="crackGlow">
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#a855f7" floodOpacity="0.8" />
      </filter>
      <filter id="crackShadow">
        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#000000" floodOpacity="1" />
      </filter>
    </defs>

    {/* Main crack lines from center */}
    <motion.path d="M500 500 L300 200 L100 50 L-100 -100" stroke="url(#crackGrad)" filter="url(#crackGlow)" strokeWidth="8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
    <motion.path d="M500 500 L400 100 L350 -50" stroke="url(#crackGrad)" filter="url(#crackShadow)" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25, delay: 0.05 }} />
    <motion.path d="M500 500 L700 250 L900 100 L1100 -50" stroke="url(#crackGrad)" filter="url(#crackGlow)" strokeWidth="9" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35 }} />
    <motion.path d="M500 500 L600 150 L650 -50" stroke="url(#crackGrad)" filter="url(#crackShadow)" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.08 }} />
    <motion.path d="M500 500 L200 450 L-50 400" stroke="url(#crackGrad)" filter="url(#crackGlow)" strokeWidth="6" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.02 }} />
    <motion.path d="M500 500 L250 600 L-50 650" stroke="url(#crackGrad)" filter="url(#crackShadow)" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25, delay: 0.1 }} />
    <motion.path d="M500 500 L800 550 L1100 600" stroke="url(#crackGrad)" filter="url(#crackGlow)" strokeWidth="7" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.03 }} />
    <motion.path d="M500 500 L750 400 L1050 300" stroke="url(#crackGrad)" filter="url(#crackShadow)" strokeWidth="5.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.28, delay: 0.07 }} />
    <motion.path d="M500 500 L350 800 L150 1100" stroke="url(#crackGrad)" filter="url(#crackGlow)" strokeWidth="8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.32, delay: 0.04 }} />
    <motion.path d="M500 500 L450 900 L400 1150" stroke="url(#crackGrad)" filter="url(#crackShadow)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.26, delay: 0.09 }} />
    <motion.path d="M500 500 L650 750 L850 1050" stroke="url(#crackGrad)" filter="url(#crackGlow)" strokeWidth="7.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.34, delay: 0.01 }} />
    <motion.path d="M500 500 L550 850 L600 1100" stroke="url(#crackGrad)" filter="url(#crackShadow)" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.29, delay: 0.06 }} />
    <motion.path d="M300 200 L200 450 L350 800 L650 750 L800 550 L700 250 Z" stroke="url(#crackGrad)" filter="url(#crackGlow)" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
    <motion.path d="M400 100 L250 600 L450 900 L550 850 L750 400 L600 150 Z" stroke="url(#crackGrad)" filter="url(#crackShadow)" strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.15 }} />
  </svg>
);

/* ── Colorful dust particles ── */
const DustParticles = () => {
  const particles = Array.from({ length: 40 }, (_, i) => {
    const angle = (i / 40) * 360;
    const distance = 80 + Math.random() * 250;
    const dx = `${Math.cos((angle * Math.PI) / 180) * distance}px`;
    const dy = `${Math.sin((angle * Math.PI) / 180) * distance}px`;
    const size = 4 + Math.random() * 10;
    const colors = ['#a855f7', '#06b6d4', '#ec4899', '#f59e0b', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return { dx, dy, size, delay: Math.random() * 0.15, color };
  });
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{
            width: p.size, height: p.size,
            background: p.color,
            borderRadius: '50%',
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 8px ${p.color}`,
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: parseFloat(p.dx), y: parseFloat(p.dy), scale: 0 }}
          transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

/* ── Typewriter hook ── */
const useTypewriter = (text, speed = 60, startDelay = 0) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);
  return displayed;
};

const Loader = ({ onComplete }) => {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState('falling');
  const [showCracks, setShowCracks] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [shake, setShake] = useState(false);
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  const line1 = useTypewriter('> Initializing Portfolio...', 50, 200);
  const line2 = useTypewriter('> Loading Assets...', 50, 900);
  const line3 = useTypewriter('> READY.', 60, 1600);

  /* Progress bar fill */
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 8;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const t1 = setTimeout(() => {
      setPhase('impact');
      setShake(true);
      setTimeout(() => setShowDust(true), 20);
      setTimeout(() => setShowCracks(true), 50);
      setTimeout(() => setShake(false), 700);

      try {
        const audio = new Audio('/sounds/mouse-sound.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => {});
      } catch {}
    }, 800);

    const t2 = setTimeout(() => {
      setPhase('done');
      setShow(false);
      setTimeout(onComplete, 700);
    }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete, started]);

  return (
    <AnimatePresence>
      {/* ── ENTER SCREEN ── */}
      {!started && (
        <motion.div
          key="enter-screen"
          className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a0533 0%, #04040a 70%)' }}
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)', transition: { duration: 0.7, ease: 'easeInOut' } }}
        >
          {/* Animated grid lines background */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Floating orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div key={i}
              className="absolute rounded-full blur-3xl pointer-events-none"
              style={{
                width: 200 + i * 80, height: 200 + i * 80,
                background: i % 2 === 0 ? 'rgba(124,58,237,0.12)' : 'rgba(6,182,212,0.08)',
                left: `${10 + i * 18}%`, top: `${15 + i * 12}%`,
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            />
          ))}

          {/* Folder icon */}
          <motion.img
            src={folderIcon}
            alt="Portfolio"
            className="w-28 h-28 md:w-36 md:h-36 mb-6 relative z-10"
            initial={{ opacity: 0, y: -40, scale: 0.4 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, type: 'spring', bounce: 0.45 }}
            style={{ filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.6)) drop-shadow(0 0 60px rgba(6,182,212,0.3))' }}
            whileHover={{ scale: 1.1, rotate: 6 }}
          />

          {/* Name */}
          <motion.div
            className="text-center mb-8 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-3"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #06b6d4, #a855f7)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientMove 3s linear infinite',
                textShadow: 'none',
                filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.5))',
              }}
            >
              Sunny Kumar
            </h1>
            <p className="text-purple-300/70 font-mono tracking-[0.35em] uppercase text-xs md:text-sm">
              Full Stack MERN Developer
            </p>
          </motion.div>

          {/* Terminal text */}
          <motion.div
            className="mb-8 font-mono text-xs md:text-sm text-left relative z-10 px-4"
            style={{ color: '#4ade80', minHeight: 60 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>{line1}<span className="animate-pulse">{line1.length > 0 && line1.length < 28 ? '|' : ''}</span></p>
            <p>{line2}<span className="animate-pulse">{line2.length > 0 && line2.length < 21 ? '|' : ''}</span></p>
            <p className="text-cyan-400 font-bold">{line3}</p>
          </motion.div>

          {/* Enter Button */}
          <motion.button
            onClick={() => setStarted(true)}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="relative z-10 group px-12 py-4 rounded-full font-bold tracking-[0.25em] uppercase text-sm text-white overflow-hidden cursor-pointer"
            style={{ border: '1px solid rgba(168,85,247,0.5)', boxShadow: '0 0 40px rgba(124,58,237,0.25)' }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3))' }}
              whileHover={{ opacity: 1.5 }}
            />
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.6), rgba(6,182,212,0.6))' }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <span>Enter Portfolio</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >→</motion.span>
            </span>
          </motion.button>

          {/* Scroll hint */}
          <motion.p
            className="absolute bottom-6 text-gray-600 text-xs tracking-widest font-mono z-10"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CLICK TO ENTER
          </motion.p>
        </motion.div>
      )}

      {/* ── LOADER ANIMATION ── */}
      {show && started && (
        <motion.div
          key="loader"
          ref={containerRef}
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden ${shake ? 'shake' : ''}`}
          style={{ background: 'radial-gradient(ellipse at 50% 50%, #1a0533 0%, #04040a 100%)' }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          {/* Stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.1,
                }}
              />
            ))}
          </div>

          {/* Cracks + Dust */}
          {showCracks && <CrackPaths />}
          {showDust && <DustParticles />}

          {/* Shockwave rings */}
          {showCracks && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              {[0, 0.1, 0.25].map((delay, i) => (
                <motion.div key={`shock-${i}`} className="absolute"
                  initial={{ scale: 0, opacity: 0.9 }}
                  animate={{ scale: 6 + i * 2, opacity: 0 }}
                  transition={{ duration: 0.8, delay, ease: 'easeOut' }}
                >
                  <div className="rounded-full"
                    style={{
                      width: 120, height: 120,
                      border: `4px solid ${i === 0 ? '#a855f7' : i === 1 ? '#06b6d4' : '#ec4899'}`,
                      boxShadow: `0 0 40px ${i === 0 ? 'rgba(168,85,247,0.8)' : i === 1 ? 'rgba(6,182,212,0.8)' : 'rgba(236,72,153,0.8)'}`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Falling avatar */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <motion.div
              className="relative"
              initial={{ y: -700, rotate: -20, scale: 2.2 }}
              animate={phase === 'falling'
                ? { y: 0, rotate: [-20, 12, -8, 4, 0], scale: [2.2, 1.8, 1.3, 1] }
                : phase === 'impact'
                ? { y: 0, rotate: 0, scale: [1, 1.5, 0.85, 1.1, 0.95, 1] }
                : {}
              }
              transition={phase === 'falling'
                ? { duration: 0.8, ease: [0.7, 0, 0.8, 0.2] }
                : { duration: 0.5, ease: 'easeOut' }
              }
            >
              {/* Purple glow aura while falling */}
              {phase === 'falling' && (
                <motion.div
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.9), rgba(6,182,212,0.4) 50%, transparent 70%)' }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 0.35, repeat: Infinity }}
                />
              )}

              {/* Avatar */}
              <motion.img
                src={profileImg}
                alt="Profile"
                className="relative w-32 h-32 md:w-56 md:h-56 rounded-full object-cover select-none"
                style={{
                  boxShadow: phase === 'falling'
                    ? '0 40px 80px rgba(168,85,247,0.9), 0 0 0 6px rgba(168,85,247,0.4), 0 0 0 12px rgba(6,182,212,0.2)'
                    : '0 10px 40px rgba(0,0,0,0.8), 0 0 0 3px rgba(168,85,247,0.6)',
                }}
              />

              {/* Speed lines */}
              {phase === 'falling' && (
                <motion.div
                  className="absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                >
                  {[130, 90, 60, 35, 15].map((w, i) => (
                    <div key={i} className="h-[2px] rounded-full"
                      style={{
                        width: w,
                        background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(168,85,247,0.9)' : 'rgba(6,182,212,0.9)'}, transparent)`,
                        marginBottom: 4,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Progress bar */}
          {phase === 'falling' && (
            <motion.div
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-between text-xs font-mono text-purple-400/60 mb-1.5">
                <span>Loading...</span>
                <span>{Math.min(Math.round(progress), 100)}%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          )}

          {/* Name reveal after impact */}
          {phase !== 'falling' && (
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-40"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-3xl font-extrabold text-white tracking-widest uppercase"
                style={{ textShadow: '0 0 20px rgba(168,85,247,0.8), 0 5px 10px rgba(0,0,0,0.8)' }}>
                Sunny Kumar
              </p>
              <p className="text-sm text-cyan-400 font-mono tracking-[0.3em] mt-2">
                Full Stack MERN Developer
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
