import { motion } from 'framer-motion';
import { FaFileDownload, FaEye, FaCode, FaBriefcase, FaGraduationCap, FaAward } from 'react-icons/fa';
import { fadeUp, fadeLeft, fadeRight, viewportOnce } from '../../hooks/useScrollReveal';
import useSound from '../../hooks/useSound';
import { personalInfo } from '../../data/portfolioData';

const highlights = [
  { icon: <FaCode />, value: '2+ Years', label: 'Coding Experience', color: 'text-purple-400' },
  { icon: <FaBriefcase />, value: '20+ Projects', label: 'Built & Delivered', color: 'text-cyan-400' },
  { icon: <FaGraduationCap />, value: 'B.Tech CSE', label: 'Degree', color: 'text-pink-400' },
  { icon: <FaAward />, value: '6+ Certs', label: 'Certifications', color: 'text-orange-400' },
];

const Resume = () => {
  const playClick = useSound();

  return (
    <section id="resume" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <p className="text-purple-400 text-sm tracking-[4px] font-mono uppercase mb-3">My Resume</p>
          <h2 className="section-heading gradient-text">Download Resume</h2>
          <div className="section-divider mt-4" />
          <p className="text-gray-500 mt-5 max-w-xl mx-auto">
            Get a detailed overview of my experience, skills, and achievements in one document.
          </p>
        </motion.div>

        {/* Main resume card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="glass rounded-3xl p-8 md:p-12 border border-purple-500/15 card-hover relative overflow-hidden"
        >
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-10 items-center relative">
            {/* Left: info */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
                  📄
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{personalInfo.name}</h3>
                  <p className="text-purple-300 text-sm">{personalInfo.role}</p>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                My resume covers my full professional journey — projects, technical skills,
                education, and certifications. Updated regularly with the latest work.
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>Last updated: April 2026 • PDF Format • 1 Page</span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href={personalInfo.resumeUrl}
                  download="Sunny_Kumar_Resume.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={playClick}
                  className="btn-primary cursor-none text-center justify-center"
                >
                  <FaFileDownload size={16} /> Download PDF
                </motion.a>
                <motion.a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={playClick}
                  className="btn-outline cursor-none text-center justify-center"
                >
                  <FaEye size={16} /> Preview Online
                </motion.a>
              </div>
            </motion.div>

            {/* Right: highlights */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-4"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="glass rounded-2xl p-5 text-center border border-white/5 card-hover"
                >
                  <span className={`text-2xl ${item.color} mb-3 block`}>{item.icon}</span>
                  <p className="text-white font-bold text-lg">{item.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Quick facts strip */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {[
            { label: 'Available For', value: 'Full-time & Freelance' },
            { label: 'Work Mode', value: 'Remote / Hybrid / On-site' },
            { label: 'Response Time', value: 'Within 24 hours' },
          ].map((item, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center border border-white/5">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-white text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
