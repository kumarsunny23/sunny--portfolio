import { motion } from 'framer-motion';
import { education } from '../../data/portfolioData';
import { fadeUp, fadeLeft, fadeRight, viewportOnce } from '../../hooks/useScrollReveal';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const Education = () => (
  <section id="education" className="section-padding relative overflow-hidden">
    <div className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }} />

    <div className="max-w-4xl mx-auto">
      <motion.div className="text-center mb-20" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <p className="text-purple-400 text-sm tracking-[4px] font-mono uppercase mb-3">My Background</p>
        <h2 className="section-heading gradient-text">Education</h2>
        <div className="section-divider mt-4" />
      </motion.div>

      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
          style={{ background: 'linear-gradient(180deg, rgba(124,58,237,0.5), rgba(6,182,212,0.3), transparent)' }} />

        <div className="space-y-14">
          {education.map((edu, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={edu.id}
                variants={isLeft ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className={`relative flex flex-col md:flex-row items-center gap-6 ${isLeft ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Card */}
                <div className="w-full md:w-[calc(50%-2.5rem)]">
                  <motion.div whileHover={{ scale: 1.02, y: -4 }}
                    className="glass rounded-2xl p-6 border border-white/5 card-hover">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">{edu.icon}</span>
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight mb-1">{edu.degree}</h3>
                        <p className="text-purple-400 text-sm font-semibold mb-1">{edu.field}</p>
                        <p className="text-gray-400 text-sm flex items-center gap-1.5">
                          <FaGraduationCap className="text-gray-500 text-xs" /> {edu.institution}
                        </p>
                        <p className="text-gray-600 text-xs mt-1 flex items-center gap-1.5">
                          <FaMapMarkerAlt className="text-gray-600 text-[10px]" /> {edu.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5 text-sm">
                      <span className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs">
                        <FaCalendarAlt size={11} /> {edu.year}
                      </span>
                      <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                        <FaStar size={11} /> {edu.cgpa}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-10 justify-center flex-shrink-0 relative z-10">
                  <motion.div
                    className="timeline-dot"
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                </div>

                <div className="hidden md:block w-[calc(50%-2.5rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Education;
