import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import profileImg from '../assets/reaper.jpg';
import folderIcon from '../assets/folder-icon.png';

/* ─── Google Font inject ─────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
    @keyframes gradMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes scanMove{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
    @keyframes glitch1{0%,100%{clip-path:inset(0 0 95% 0);transform:translateX(-4px)}25%{clip-path:inset(30% 0 50% 0);transform:translateX(4px)}50%{clip-path:inset(60% 0 20% 0);transform:translateX(-2px)}75%{clip-path:inset(80% 0 5% 0);transform:translateX(3px)}}
    @keyframes glitch2{0%,100%{clip-path:inset(60% 0 20% 0);transform:translateX(4px)}25%{clip-path:inset(10% 0 70% 0);transform:translateX(-4px)}50%{clip-path:inset(80% 0 5% 0);transform:translateX(2px)}75%{clip-path:inset(20% 0 60% 0);transform:translateX(-3px)}}
    @keyframes shake{0%,100%{transform:translate(0,0) rotate(0deg)}10%{transform:translate(-12px,-8px) rotate(-1.5deg)}20%{transform:translate(12px,8px) rotate(1.5deg)}30%{transform:translate(-10px,6px) rotate(-1deg)}40%{transform:translate(10px,-6px) rotate(1deg)}50%{transform:translate(-8px,4px) rotate(-0.5deg)}60%{transform:translate(8px,-4px) rotate(0.5deg)}70%{transform:translate(-5px,2px) rotate(-0.3deg)}80%{transform:translate(5px,-2px) rotate(0.3deg)}90%{transform:translate(-2px,1px) rotate(0deg)}}
    @keyframes rgbSplit{0%,100%{text-shadow:2px 0 #f00,-2px 0 #0ff}25%{text-shadow:-3px 0 #f00,3px 0 #0ff}50%{text-shadow:1px 0 #0ff,-1px 0 #f00}75%{text-shadow:-2px 0 #0ff,2px 0 #f00}}
    @keyframes nodeFloat{0%,100%{transform:translateY(0px)}50%{transform:translateY(-8px)}}
    .shake{animation:shake 0.65s cubic-bezier(.36,.07,.19,.97) both}
    .glitch-text{position:relative}
    .glitch-text::before,.glitch-text::after{content:attr(data-text);position:absolute;left:0;top:0;width:100%;height:100%}
    .glitch-text::before{color:#f0f;animation:glitch1 3s infinite steps(1);opacity:0.7}
    .glitch-text::after{color:#0ff;animation:glitch2 3s infinite steps(1);opacity:0.7}
    .scanline{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:5}
    .scanline::after{content:'';position:absolute;width:100%;height:40px;background:linear-gradient(transparent,rgba(168,85,247,0.04),transparent);animation:scanMove 4s linear infinite}
    .crt-lines{position:absolute;inset:0;pointer-events:none;z-index:4;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)}
  `}</style>
);

/* ─── Crack SVG ──────────────────────────────────────── */
const CrackPaths = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000"
    preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 10 }}>
    <defs>
      <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#000" stopOpacity="1" />
      </linearGradient>
      <filter id="cglow"><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#a855f7" floodOpacity="1" /></filter>
      <filter id="cshadow"><feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#000" floodOpacity="1" /></filter>
      <filter id="cblue"><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#06b6d4" floodOpacity="0.9" /></filter>
    </defs>
    {[
      { d: "M500 500 L280 180 L80 30 L-120 -120", w: 9, f: "cglow", delay: 0 },
      { d: "M500 500 L380 80 L330 -70", w: 4.5, f: "cshadow", delay: 0.05 },
      { d: "M500 500 L720 240 L930 80 L1120 -60", w: 10, f: "cglow", delay: 0 },
      { d: "M500 500 L610 140 L660 -60", w: 5.5, f: "cblue", delay: 0.08 },
      { d: "M500 500 L180 430 L-70 380", w: 7, f: "cglow", delay: 0.02 },
      { d: "M500 500 L240 610 L-60 660", w: 4, f: "cshadow", delay: 0.1 },
      { d: "M500 500 L820 560 L1120 610", w: 8, f: "cblue", delay: 0.03 },
      { d: "M500 500 L760 410 L1060 310", w: 6, f: "cglow", delay: 0.07 },
      { d: "M500 500 L340 820 L130 1120", w: 9, f: "cglow", delay: 0.04 },
      { d: "M500 500 L440 920 L390 1160", w: 3.5, f: "cshadow", delay: 0.09 },
      { d: "M500 500 L660 760 L870 1060", w: 8, f: "cblue", delay: 0.01 },
      { d: "M500 500 L560 860 L610 1110", w: 4, f: "cshadow", delay: 0.06 },
      { d: "M280 180 L180 430 L340 820 L660 760 L820 560 L720 240 Z", w: 2, f: "cglow", delay: 0.12 },
      { d: "M380 80 L240 610 L440 920 L560 860 L760 410 L610 140 Z", w: 1.5, f: "cblue", delay: 0.17 },
      { d: "M500 500 L480 520 L460 560 L500 600 L540 560 L520 520 Z", w: 1, f: "cglow", delay: 0.2 },
    ].map((c, i) => (
      <motion.path key={i} d={c.d} stroke="url(#cg)" filter={`url(#${c.f})`}
        strokeWidth={c.w} strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3 + i * 0.01, delay: c.delay, ease: "easeOut" }} />
    ))}
    {/* Impact shimmer circle */}
    <motion.circle cx="500" cy="500" r="80" stroke="url(#cg)" strokeWidth="2" fill="none"
      filter="url(#cglow)"
      initial={{ r: 0, opacity: 1 }} animate={{ r: 180, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }} />
  </svg>
);

/* ─── Dust Particles (mixed shapes) ─────────────────── */
const DustParticles = () => {
  const particles = Array.from({ length: 55 }, (_, i) => {
    const angle = (i / 55) * 360 + Math.random() * 10;
    const dist = 60 + Math.random() * 300;
    return {
      dx: `${Math.cos((angle * Math.PI) / 180) * dist}px`,
      dy: `${Math.sin((angle * Math.PI) / 180) * dist}px`,
      size: 3 + Math.random() * 12,
      delay: Math.random() * 0.2,
      color: ['#a855f7', '#06b6d4', '#ec4899', '#f59e0b', '#fff', '#7c3aed'][Math.floor(Math.random() * 6)],
      shape: Math.floor(Math.random() * 3), // 0=circle,1=square,2=triangle
      rotate: Math.random() * 360,
    };
  });
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {particles.map((p, i) => (
        <motion.div key={i} style={{
          width: p.size, height: p.size,
          background: p.shape === 2 ? 'transparent' : p.color,
          borderRadius: p.shape === 0 ? '50%' : p.shape === 1 ? '2px' : '0',
          borderLeft: p.shape === 2 ? `${p.size / 2}px solid transparent` : '',
          borderRight: p.shape === 2 ? `${p.size / 2}px solid transparent` : '',
          borderBottom: p.shape === 2 ? `${p.size}px solid ${p.color}` : '',
          position: 'absolute', top: '50%', left: '50%',
          boxShadow: p.shape !== 2 ? `0 0 10px ${p.color},0 0 20px ${p.color}55` : '',
        }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          animate={{ opacity: 0, x: parseFloat(p.dx), y: parseFloat(p.dy), scale: 0, rotate: p.rotate + 360 }}
          transition={{ duration: 1.4, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

/* ─── Flash Overlay ──────────────────────────────────── */
const FlashOverlay = ({ active }) => (
  <AnimatePresence>
    {active && (
      <motion.div key="flash" className="absolute inset-0 z-[50] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%,rgba(255,255,255,0.95),rgba(168,85,247,0.7) 40%,transparent 75%)' }}
        initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.4, times: [0, 0.1, 1] }} />
    )}
  </AnimatePresence>
);

/* ─── Typewriter hook ────────────────────────────────── */
const useTypewriter = (text, speed = 55, startDelay = 0) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => { setDisplayed(text.slice(0, ++i)); if (i >= text.length) clearInterval(iv); }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return displayed;
};

/* ─── Floating network nodes for Enter screen ───────── */
const NetworkNodes = () => {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    x: `${8 + i * 8}%`, y: `${15 + Math.sin(i) * 30}%`,
    size: i % 3 === 0 ? 6 : 4, delay: i * 0.2,
  }));
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ zIndex: 1 }}>
      {nodes.map((n, i) => nodes.slice(i + 1, i + 3).map((m, j) => (
        <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
          stroke="rgba(168,85,247,0.4)" strokeWidth="1" />
      )))}
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r={n.size}
          fill="#a855f7" opacity="0.6"
          animate={{ r: [n.size, n.size + 2, n.size], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: n.delay }} />
      ))}
    </svg>
  );
};

/* ─── Chromatic aberration avatar ───────────────────── */
const AvatarFalling = ({ src, phase }) => (
  <div className="relative">
    {/* RGB split layers while falling */}
    {phase === 'falling' && (
      <>
        <motion.img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full rounded-full object-cover select-none"
          style={{ mixBlendMode: 'screen', filter: 'url(#redShift)', opacity: 0.55, transform: 'translate(-4px,0)' }}
          animate={{ x: [-4, -6, -3, -5, -4] }} transition={{ duration: 0.15, repeat: Infinity }} />
        <motion.img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full rounded-full object-cover select-none"
          style={{ mixBlendMode: 'screen', filter: 'url(#blueShift)', opacity: 0.55, transform: 'translate(4px,0)' }}
          animate={{ x: [4, 6, 3, 5, 4] }} transition={{ duration: 0.15, repeat: Infinity }} />
      </>
    )}
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="redShift"><feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" /></filter>
        <filter id="blueShift"><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" /></filter>
      </defs>
    </svg>
    <img src={src} alt="Profile"
      className="relative w-32 h-32 md:w-56 md:h-56 rounded-full object-cover select-none"
      style={{
        boxShadow: phase === 'falling'
          ? '0 40px 100px rgba(168,85,247,1),0 0 0 6px rgba(168,85,247,0.5),0 0 0 14px rgba(6,182,212,0.25),inset 0 0 20px rgba(168,85,247,0.3)'
          : '0 10px 50px rgba(0,0,0,0.9),0 0 0 3px rgba(168,85,247,0.7),0 0 30px rgba(168,85,247,0.4)',
        transition: 'box-shadow 0.3s',
      }} />
  </div>
);

/* ─── Segmented progress bar ─────────────────────────── */
const ProgressBar = ({ progress }) => (
  <motion.div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-72 z-40"
    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
    <div className="flex justify-between mb-2" style={{ fontFamily: 'Share Tech Mono,monospace' }}>
      <span style={{ color: 'rgba(168,85,247,0.7)', fontSize: 11, letterSpacing: '0.15em' }}>LOADING ASSETS</span>
      <span style={{ color: '#06b6d4', fontSize: 11, letterSpacing: '0.1em' }}>{Math.min(Math.round(progress), 100)}%</span>
    </div>
    <div className="relative h-2 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(168,85,247,0.2)' }}>
      <motion.div className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: 'linear-gradient(90deg,#7c3aed,#a855f7,#06b6d4)', boxShadow: '0 0 12px rgba(168,85,247,0.8),0 0 24px rgba(6,182,212,0.4)' }}
        animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ duration: 0.12 }} />
      {/* segment marks */}
      {[25, 50, 75].map(p => (
        <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: 1, background: 'rgba(0,0,0,0.4)' }} />
      ))}
    </div>
    {/* Sub label */}
    <motion.p className="text-center mt-1.5" style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, color: 'rgba(168,85,247,0.4)', letterSpacing: '0.25em' }}
      animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
      {progress < 30 ? 'INITIALIZING SYSTEMS...' : progress < 60 ? 'COMPILING MODULES...' : progress < 90 ? 'OPTIMIZING RENDER...' : 'ALMOST READY...'}
    </motion.p>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════
   MAIN LOADER
═══════════════════════════════════════════════════════ */
const Loader = ({ onComplete }) => {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState('falling');
  const [showCracks, setShowCracks] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState(false);
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  const line1 = useTypewriter('> Initializing Portfolio...', 48, 200);
  const line2 = useTypewriter('> Loading Assets...', 48, 900);
  const line3 = useTypewriter('> READY.', 55, 1600);

  useEffect(() => {
    if (!started) return;
    const iv = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(iv); return 100; } return p + Math.random() * 7; });
    }, 75);
    return () => clearInterval(iv);
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const t1 = setTimeout(() => {
      setPhase('impact');
      setFlash(true);
      setShake(true);
      setTimeout(() => setShowDust(true), 30);
      setTimeout(() => setShowCracks(true), 60);
      setTimeout(() => { setShake(false); setFlash(false); }, 700);
      try { const a = new Audio('/sounds/mouse-sound.mp3'); a.volume = 0.5; a.play().catch(() => { }); } catch { }
    }, 850);
    const t2 = setTimeout(() => {
      setPhase('done');
      setShow(false);
      setTimeout(onComplete, 750);
    }, 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete, started]);

  return (
    <AnimatePresence>
      <FontLoader />

      {/* ── ENTER SCREEN ──────────────────────────────── */}
      {!started && (
        <motion.div key="enter"
          className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at 50% 25%,#1a0533 0%,#06020f 65%,#000 100%)' }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(14px)', transition: { duration: 0.7 } }}>

          {/* CRT scanlines */}
          <div className="crt-lines" />
          <div className="scanline" />

          {/* Grid bg */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(124,58,237,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.05) 1px,transparent 1px)',
            backgroundSize: '70px 70px', zIndex: 0,
          }} />

          {/* Network nodes */}
          <NetworkNodes />

          {/* Ambient orbs */}
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div key={i} className="absolute rounded-full blur-[80px] pointer-events-none"
              style={{
                width: 180 + i * 90, height: 180 + i * 90,
                background: i % 2 === 0 ? 'rgba(124,58,237,0.13)' : 'rgba(6,182,212,0.09)',
                left: `${8 + i * 18}%`, top: `${10 + i * 14}%`,
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.6 }} />
          ))}

          {/* Folder icon */}
          <motion.div className="relative mb-6 z-10"
            initial={{ opacity: 0, y: -50, scale: 0.3 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, type: 'spring', bounce: 0.5 }}>
            <motion.div className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: 'radial-gradient(circle,rgba(168,85,247,0.5),transparent 70%)' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            <img src={folderIcon} alt="Portfolio"
              className="relative w-28 h-28 md:w-36 md:h-36"
              style={{ filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.7)) drop-shadow(0 0 60px rgba(6,182,212,0.35))' }} />
          </motion.div>

          {/* Name with glitch */}
          <motion.div className="text-center mb-8 z-10"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="relative overflow-visible">
              <h1 data-text="Sunny Kumar"
                className="glitch-text text-5xl md:text-7xl font-black tracking-tight mb-3"
                style={{
                  fontFamily: 'Orbitron,sans-serif',
                  background: 'linear-gradient(135deg,#a855f7 0%,#06b6d4 40%,#a855f7 80%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  animation: 'gradMove 3s linear infinite',
                  filter: 'drop-shadow(0 0 25px rgba(168,85,247,0.6))',
                }}>
                Sunny Kumar
              </h1>
            </div>
            <p style={{
              fontFamily: 'Share Tech Mono,monospace', color: 'rgba(6,182,212,0.7)',
              letterSpacing: '0.35em', fontSize: 11, textTransform: 'uppercase'
            }}>
              Full Stack MERN Developer
            </p>
          </motion.div>

          {/* Terminal */}
          <motion.div className="mb-8 z-10 px-4 text-left"
            style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 13, minHeight: 62, color: '#4ade80' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <p style={{ marginBottom: 2 }}>{line1}{line1.length > 0 && line1.length < 30 ? <span style={{ animation: 'none', opacity: 1 }}>▌</span> : null}</p>
            <p style={{ marginBottom: 2 }}>{line2}{line2.length > 0 && line2.length < 21 ? <span>▌</span> : null}</p>
            <p style={{ color: '#06b6d4', fontWeight: 'bold' }}>{line3}{line3.length > 0 && line3.length < 9 ? <span>▌</span> : null}</p>
          </motion.div>

          {/* Enter button */}
          <motion.button onClick={() => setStarted(true)}
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.65, type: 'spring', bounce: 0.4 }}
            whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.92 }}
            className="relative z-10 group px-14 py-4 font-black uppercase tracking-[0.3em] text-sm text-white overflow-hidden cursor-pointer"
            style={{
              fontFamily: 'Orbitron,sans-serif',
              border: '1px solid rgba(168,85,247,0.55)',
              borderRadius: 3,
              background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.15))',
              boxShadow: '0 0 40px rgba(124,58,237,0.2),inset 0 0 20px rgba(168,85,247,0.05)',
            }}>
            {/* corner decorations */}
            {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
              <span key={i} className={`absolute ${pos} w-2 h-2 pointer-events-none`}
                style={{
                  borderTop: i < 2 ? '2px solid #a855f7' : '', borderBottom: i >= 2 ? '2px solid #a855f7' : '',
                  borderLeft: i % 2 === 0 ? '2px solid #a855f7' : '', borderRight: i % 2 !== 0 ? '2px solid #a855f7' : ''
                }} />
            ))}
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.45),rgba(6,182,212,0.4))' }} />
            <span className="relative z-10 flex items-center gap-3">
              Enter Portfolio
              <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
            </span>
          </motion.button>

          <motion.p className="absolute bottom-6 z-10" style={{
            fontFamily: 'Share Tech Mono,monospace', fontSize: 10, letterSpacing: '0.4em',
            color: 'rgba(168,85,247,0.35)',
          }} animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
            [ CLICK TO ENTER ]
          </motion.p>
        </motion.div>
      )}

      {/* ── LOADER ANIMATION ──────────────────────────── */}
      {show && started && (
        <motion.div key="loader" ref={containerRef}
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden${shake ? ' shake' : ''}`}
          style={{ background: 'radial-gradient(ellipse at 50% 40%,#1a0533 0%,#06020f 60%,#000 100%)' }}
          exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 0.8 } }}>

          <div className="crt-lines" />
          <div className="scanline" />

          {/* Stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div key={i} className="absolute rounded-full bg-white" style={{
                width: Math.random() * 2.5 + 0.5, height: Math.random() * 2.5 + 0.5,
                left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              }}
                animate={{ opacity: [Math.random() * 0.3 + 0.05, Math.random() * 0.6 + 0.2, Math.random() * 0.3 + 0.05] }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }} />
            ))}
          </div>

          {/* Grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)',
            backgroundSize: '80px 80px',
          }} />

          {/* Flash */}
          <FlashOverlay active={flash} />

          {/* Cracks + Dust */}
          {showCracks && <CrackPaths />}
          {showDust && <DustParticles />}

          {/* Shockwave rings */}
          {showCracks && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              {[
                { delay: 0, color: '#a855f7', size: 100 },
                { delay: 0.1, color: '#06b6d4', size: 120 },
                { delay: 0.22, color: '#ec4899', size: 90 },
                { delay: 0.35, color: '#a855f7', size: 80 },
              ].map((s, i) => (
                <motion.div key={i} className="absolute" style={{ width: s.size, height: s.size }}
                  initial={{ scale: 0, opacity: 0.95 }} animate={{ scale: 7 + i * 1.5, opacity: 0 }}
                  transition={{ duration: 0.9, delay: s.delay, ease: 'easeOut' }}>
                  <div className="w-full h-full rounded-full" style={{
                    border: `${4 - i * 0.5}px solid ${s.color}`,
                    boxShadow: `0 0 40px ${s.color}cc,inset 0 0 20px ${s.color}44`,
                  }} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Falling avatar */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <motion.div className="relative"
              initial={{ y: -800, rotate: -25, scale: 2.5 }}
              animate={phase === 'falling'
                ? { y: 0, rotate: [-25, 14, -9, 5, 0], scale: [2.5, 2, 1.4, 1] }
                : phase === 'impact'
                  ? { y: [0, 0], rotate: 0, scale: [1, 1.6, 0.8, 1.15, 0.92, 1] }
                  : {}}
              transition={phase === 'falling'
                ? { duration: 0.85, ease: [0.7, 0, 0.85, 0.15] }
                : { duration: 0.55, ease: 'easeOut' }}>

              {/* Aura while falling */}
              {phase === 'falling' && (
                <motion.div className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle,rgba(168,85,247,0.95),rgba(6,182,212,0.45) 55%,transparent 75%)',
                    filter: 'blur(20px)', transform: 'scale(1.8)',
                  }}
                  animate={{ scale: [1.6, 2, 1.6], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 0.3, repeat: Infinity }} />
              )}

              {/* Impact ground glow */}
              {phase === 'impact' && (
                <motion.div className="absolute -bottom-10 left-1/2 -translate-x-1/2"
                  style={{ width: 300, height: 60, background: 'radial-gradient(ellipse,rgba(168,85,247,0.8),transparent 70%)', filter: 'blur(15px)' }}
                  initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: [1, 0], scaleX: [0.5, 2] }}
                  transition={{ duration: 0.8, ease: 'easeOut' }} />
              )}

              <AvatarFalling src={profileImg} phase={phase} />

              {/* Speed lines */}
              {phase === 'falling' && (
                <motion.div className="absolute -top-28 left-1/2 -translate-x-1/2 flex flex-col items-center"
                  style={{ gap: 5 }} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.6] }}
                  transition={{ duration: 0.18, repeat: Infinity }}>
                  {[140, 100, 72, 45, 22, 10].map((w, i) => (
                    <div key={i} style={{
                      width: w, height: 2, marginBottom: 3,
                      background: `linear-gradient(90deg,transparent,${i % 2 === 0 ? 'rgba(168,85,247,0.95)' : 'rgba(6,182,212,0.9)'},transparent)`,
                      borderRadius: 2,
                    }} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Progress bar */}
          {phase === 'falling' && <ProgressBar progress={progress} />}

          {/* Name reveal after impact */}
          {phase !== 'falling' && (
            <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-40 px-4"
              initial={{ opacity: 0, y: 40, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35, type: 'spring', bounce: 0.3 }}>
              {/* Decorative line */}
              <motion.div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#a855f7,#06b6d4,transparent)', marginBottom: 12 }}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
              <h2 style={{
                fontFamily: 'Orbitron,sans-serif', fontWeight: 900,
                fontSize: 'clamp(1.5rem,4vw,2.5rem)',
                color: '#fff', letterSpacing: '0.25em', textTransform: 'uppercase',
                textShadow: '0 0 30px rgba(168,85,247,0.9),0 0 60px rgba(168,85,247,0.4),0 5px 15px rgba(0,0,0,0.8)',
              }}>
                Sunny Kumar
              </h2>
              <p style={{
                fontFamily: 'Share Tech Mono,monospace', color: '#06b6d4',
                letterSpacing: '0.35em', fontSize: 11, textTransform: 'uppercase', marginTop: 8,
              }}>
                Full Stack MERN Developer
              </p>
              <motion.div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#06b6d4,#a855f7,transparent)', marginTop: 12 }}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;