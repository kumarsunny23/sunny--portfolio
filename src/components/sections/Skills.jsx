import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaDatabase, FaDocker, FaAws, FaGitAlt, FaHtml5, FaCss3Alt, FaJs, FaServer
} from 'react-icons/fa';
import {
  SiMongodb, SiExpress, SiTailwindcss, SiNextdotjs, SiTypescript,
  SiGraphql, SiSocketdotio, SiRedis, SiFirebase, SiPostgresql, SiMysql, SiPostman, SiLinux
} from 'react-icons/si';
import { fadeUp, staggerContainer, viewportOnce } from '../../hooks/useScrollReveal';

const techSkills = [
  { name: 'React.js', icon: <FaReact />, color: '#61dafb' },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
  { name: 'Express.js', icon: <SiExpress />, color: '#fff' },
  { name: 'JavaScript', icon: <FaJs />, color: '#f7df1e' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178c6' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: '#fff' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38bdf8' },
  { name: 'HTML5', icon: <FaHtml5 />, color: '#e34c26' },
  { name: 'CSS3', icon: <FaCss3Alt />, color: '#264de4' },
  { name: 'GraphQL', icon: <SiGraphql />, color: '#e10098' },
  { name: 'Socket.io', icon: <SiSocketdotio />, color: '#fff' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
  { name: 'MySQL', icon: <SiMysql />, color: '#4479a1' },
  { name: 'Redis', icon: <SiRedis />, color: '#dc382d' },
  { name: 'Firebase', icon: <SiFirebase />, color: '#ffca28' },
  { name: 'Docker', icon: <FaDocker />, color: '#2496ed' },
  { name: 'AWS', icon: <FaAws />, color: '#ff9900' },
  { name: 'Git', icon: <FaGitAlt />, color: '#f05032' },
  { name: 'Postman', icon: <SiPostman />, color: '#ff6c37' },
  { name: 'Linux CLI', icon: <SiLinux />, color: '#fcc624' },
  { name: 'REST APIs', icon: <FaServer />, color: '#a78bfa' },
];

const categories = [
  {
    title: 'Frontend',
    icon: <FaReact className="text-cyan-400" />,
    border: 'border-purple-500/20',
    skills: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    title: 'Backend',
    icon: <FaNodeJs className="text-green-400" />,
    border: 'border-green-500/20',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Socket.io'],
  },
  {
    title: 'Database',
    icon: <FaDatabase className="text-orange-400" />,
    border: 'border-orange-500/20',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  },
  {
    title: 'DevOps & Tools',
    icon: <FaDocker className="text-blue-400" />,
    border: 'border-blue-500/20',
    skills: ['Docker', 'AWS', 'Git', 'Linux CLI', 'Postman'],
  },
];

const Skills = () => (
  <section id="skills" className="section-padding relative overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-20" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <p className="text-purple-400 text-sm tracking-[4px] font-mono uppercase mb-3">What I Know</p>
        <h2 className="section-heading gradient-text">My Skills</h2>
        <div className="section-divider mt-4" />
        <p className="text-gray-500 mt-5 max-w-xl mx-auto">A full-stack toolkit — from pixel-perfect UIs to scalable server architecture.</p>
      </motion.div>

      <motion.div className="grid md:grid-cols-2 gap-6 mb-16" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        {categories.map((cat) => (
          <motion.div key={cat.title} variants={fadeUp} whileHover={{ y: -5 }}
            className={`glass rounded-2xl p-6 border ${cat.border} card-hover`}>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="text-white font-bold text-lg">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skillName) => {
                const tech = techSkills.find(t => t.name === skillName);
                return (
                  <motion.span key={skillName} whileHover={{ scale: 1.08 }} className="skill-tag">
                    <span style={{ color: tech?.color || '#a78bfa', fontSize: '1rem' }}>{tech?.icon}</span>
                    {skillName}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center">
        <p className="text-gray-600 text-xs font-mono tracking-[3px] uppercase mb-6">All Technologies</p>
        <div className="flex flex-wrap justify-center gap-3">
          {techSkills.map((tech) => (
            <motion.div key={tech.name} whileHover={{ scale: 1.12, y: -4 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/6 text-sm text-gray-400 hover:text-white transition-all cursor-default">
              <span style={{ color: tech.color, fontSize: '1rem' }}>{tech.icon}</span>
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Skills;
