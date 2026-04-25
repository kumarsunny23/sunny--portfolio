import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import { fadeUp, staggerContainerFast, viewportOnce } from '../../hooks/useScrollReveal';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import useSound from '../../hooks/useSound';

const ProjectCard = ({ project, playClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-colors duration-300 group"
    >
      {/* Gradient top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.color}`} />

      {/* Card image placeholder with gradient */}
      <div
        className={`relative h-44 bg-gradient-to-br ${project.color} opacity-20 flex items-center justify-center overflow-hidden`}
      >
        <span className="text-6xl">
          {project.id === 1 ? '📹' : project.id === 2 ? '🛒' : project.id === 3 ? '🤖' :
           project.id === 4 ? '📋' : project.id === 5 ? '📝' : '💬'}
        </span>
        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
            >
              <motion.a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={playClick}
                className="w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-purple-500/30 transition cursor-none"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </motion.a>
              <motion.a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.05 }}
                whileHover={{ scale: 1.1 }}
                onClick={playClick}
                className="w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-cyan-500/30 transition cursor-none"
                aria-label="Live demo"
              >
                <FaExternalLinkAlt size={16} />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Featured
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer links */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={playClick}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs transition-colors cursor-none"
          >
            <FaGithub size={14} /> Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            onClick={playClick}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs transition-colors cursor-none"
          >
            <FaExternalLinkAlt size={12} /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const playClick = useSound();

  const filtered = filter === 'featured'
    ? projects.filter(p => p.featured)
    : projects;

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-purple-400 text-sm tracking-[4px] font-mono uppercase mb-3">My Work</p>
          <h2 className="section-heading gradient-text">Projects</h2>
          <div className="section-divider mt-4 mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto">
            A selection of projects I've built — from real-time apps to AI-powered tools.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex justify-center gap-3 mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {['all', 'featured'].map(f => (
            <motion.button
              key={f}
              onClick={() => { playClick(); setFilter(f); }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-none ${
                filter === f
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-glow'
                  : 'glass text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <AnimatePresence>
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} playClick={playClick} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.a
            href="https://github.com/sunnykumar"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playClick}
            className="btn-outline cursor-none inline-flex items-center gap-2"
          >
            <FaGithub size={18} /> View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
