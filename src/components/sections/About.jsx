import { motion } from 'framer-motion';
import { personalInfo, aboutDescription, aboutStats } from '../../data/portfolioData';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '../../hooks/useScrollReveal';
import { FaMapMarkerAlt, FaEnvelope, FaBriefcase } from 'react-icons/fa';
import profileImg from '../../assets/profile.jpg';
import baseImg from '../../assets/3d-base.png';

const About = () => {
  const infoItems = [
    { icon: <FaMapMarkerAlt />, label: 'Location', value: personalInfo.location },
    { icon: <FaEnvelope />, label: 'Email', value: personalInfo.email },
    { icon: <FaBriefcase />, label: 'Role', value: personalInfo.role },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div className="text-center mb-20" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <p className="text-purple-400 text-sm tracking-[4px] font-mono uppercase mb-3">Get To Know Me</p>
          <h2 className="section-heading gradient-text">About Me</h2>
          <div className="section-divider mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Avatar side */}
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute rounded-full"
                style={{ inset: -20, border: '1px solid rgba(124,58,237,0.2)', borderRadius: '50%' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{ inset: -36, border: '1px dashed rgba(6,182,212,0.15)', borderRadius: '50%' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />

              {/* 3D Base Platform */}
              <motion.img
                src={baseImg}
                alt="3D Platform"
                className="absolute -bottom-20 -left-6 w-[300px] object-contain"
                style={{ zIndex: 0, filter: 'drop-shadow(0px 20px 40px rgba(124,58,237,0.6))' }}
                animate={{ y: [0, 8, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              />

              {/* Avatar */}
              <motion.img
                src={profileImg}
                alt="Profile"
                className="w-60 h-60 rounded-full object-cover relative z-10"
                style={{ boxShadow: '0 0 60px rgba(124,58,237,0.4)' }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Floating particles around avatar */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: (Math.random() * 6 + 4) + 'px',
                    height: (Math.random() * 6 + 4) + 'px',
                    background: i % 2 === 0 ? '#06b6d4' : '#7c3aed',
                    boxShadow: `0 0 15px ${i % 2 === 0 ? '#06b6d4' : '#7c3aed'}`,
                    top: (Math.random() * 80 + 10) + '%',
                    left: (Math.random() * 120 - 10) + '%',
                    zIndex: 20,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, (Math.random() * 20 - 10), 0],
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.5, 0.8]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: Math.random() * 2
                  }}
                />
              ))}

              {/* Floating badges */}
              <motion.div
                className="absolute -top-3 -right-6 glass px-3 py-1.5 rounded-full text-xs font-semibold text-cyan-400 border border-cyan-500/20"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                🚀 MERN Stack
              </motion.div>
              <motion.div
                className="absolute -bottom-3 -left-6 glass px-3 py-1.5 rounded-full text-xs font-semibold text-purple-400 border border-purple-500/20"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              >
                JAVA DEVELOPER
              </motion.div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-6">
            <h3 className="text-2xl font-bold text-white">
              Full Stack Developer &{' '}
              <span className="cursive-text gradient-text text-3xl">Problem Solver</span>
            </h3>
            <div className="space-y-3">
              {aboutDescription.split('\n').map((para, i) => (
                <p key={i} className="text-gray-400 leading-relaxed text-base">{para}</p>
              ))}
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {infoItems.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 4 }}
                  className="glass rounded-xl p-3 flex items-center gap-3 border border-white/5 card-hover"
                >
                  <span className="text-purple-400 text-sm flex-shrink-0">{item.icon}</span>
                  <div className="overflow-hidden">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider">{item.label}</p>
                    <p className="text-white text-xs font-medium truncate">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {aboutStats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.04 }}
              className="glass rounded-2xl p-7 text-center border border-white/5 card-hover"
            >
              <p className="text-4xl font-black gradient-text mb-2">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
