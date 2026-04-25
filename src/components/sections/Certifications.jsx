import { motion } from 'framer-motion';
import { certifications } from '../../data/portfolioData';
import { fadeUp, staggerContainer, viewportOnce } from '../../hooks/useScrollReveal';
import { FaExternalLinkAlt, FaMedal } from 'react-icons/fa';
import useSound from '../../hooks/useSound';

const Certifications = () => {
  const playClick = useSound();

  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <p className="text-purple-400 text-sm tracking-[4px] font-mono uppercase mb-3">My Achievements</p>
          <h2 className="section-heading gradient-text">Certifications</h2>
          <div className="section-divider mt-4" />
          <p className="text-gray-500 mt-5 max-w-xl mx-auto">Continuously learning through industry-recognized certifications.</p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {certifications.map((cert) => (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="glass rounded-2xl p-6 border border-white/5 card-hover group block cursor-none relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {cert.icon}
              </div>

              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-bold text-sm leading-snug group-hover:text-purple-300 transition-colors flex-1 pr-2">
                  {cert.title}
                </h3>
                <FaMedal className="text-yellow-400 flex-shrink-0 mt-0.5" size={14} />
              </div>

              <p className="text-gray-500 text-xs mb-4">{cert.issuer}</p>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-cyan-400 text-xs font-mono">{cert.year}</span>
                <span className="flex items-center gap-1 text-gray-600 text-xs group-hover:text-purple-400 transition-colors">
                  View <FaExternalLinkAlt size={10} />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
