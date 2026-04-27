import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaDatabase, FaDocker, FaTools, FaCode
} from 'react-icons/fa';
import { fadeUp, viewportOnce } from '../../hooks/useScrollReveal';
import profilePic from '../../assets/profile.jpg';

const orbitNodes = [
  { 
    title: "CS & Langs", 
    icon: <FaCode className="text-yellow-400" />, 
    skills: ["DSA with Java", "JavaScript", "CS Fundamentals", "DBMS", "OS"] 
  },
  { 
    title: "Frontend", 
    icon: <FaReact className="text-cyan-400" />, 
    skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"] 
  },
  { 
    title: "Backend", 
    icon: <FaNodeJs className="text-green-400" />, 
    skills: ["Node.js", "Express.js", "REST APIs", "GraphQL"] 
  },
  { 
    title: "Database", 
    icon: <FaDatabase className="text-orange-400" />, 
    skills: ["MongoDB", "PostgreSQL", "Redis", "MySQL"] 
  },
  { 
    title: "Tools & Git", 
    icon: <FaTools className="text-purple-400" />, 
    skills: ["Git & GitHub", "Postman", "VS Code", "Linux"] 
  },
  { 
    title: "DevOps", 
    icon: <FaDocker className="text-blue-400" />, 
    skills: ["Docker", "AWS (EC2, S3)", "CI/CD", "Firebase"] 
  },
];

const Skills = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-10" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <p className="text-purple-400 text-sm tracking-[4px] font-mono uppercase mb-3">Expertise</p>
          <h2 className="section-heading gradient-text">My Skills</h2>
          <div className="section-divider mt-4" />
          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">
            Hover over each category to see the specific technologies I use.
          </p>
        </motion.div>

        {/* Orbit Layout */}
        <div className="relative w-full max-w-[380px] sm:max-w-[550px] md:max-w-[700px] aspect-square mx-auto mt-16 md:mt-24 mb-24 md:mb-32">
          
          {/* Large soft background circle */}
          <div className="absolute inset-0 scale-[0.85] rounded-full bg-gradient-to-br from-purple-500/10 to-cyan-500/10 blur-3xl pointer-events-none" />

          {/* Outer Dotted circle path with glowing particle */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full rounded-full border-[1.5px] border-dashed border-gray-600/30 pointer-events-none" 
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(168,85,247,1)]" />
          </motion.div>
          
          {/* Inner Dotted circle path with glowing particle */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-[18%] left-[18%] w-[64%] h-[64%] rounded-full border-[1.5px] border-dashed border-gray-600/20 pointer-events-none" 
          >
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,1)]" />
          </motion.div>

          {/* Connecting Lines */}
          {orbitNodes.map((_, index) => {
            const angle = (index / orbitNodes.length) * 360 - 90;
            return (
              <div 
                key={`line-${index}`}
                className="absolute top-1/2 left-1/2 w-[50%] h-[1.5px] origin-left pointer-events-none z-0"
                style={{ 
                  transform: `rotate(${angle}deg)`,
                  background: 'linear-gradient(90deg, rgba(168,85,247,0.3) 0%, rgba(6,182,212,0.1) 60%, transparent 100%)'
                }}
              />
            );
          })}

          {/* Center User Profile */}
          <motion.div 
            className="absolute top-1/2 left-1/2 z-20 w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 flex items-center justify-center group cursor-pointer"
            initial={{ scale: 0, x: "-50%", y: "-50%" }}
            whileInView={{ scale: 1, x: "-50%", y: "-50%" }}
            viewport={viewportOnce}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            {/* Subtle Pulse Ring */}
            <motion.div 
               animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute inset-0 rounded-full border-[1.5px] border-purple-500/50 z-0 pointer-events-none"
            />

            {/* The Photo Container */}
            <motion.div 
               animate={{ boxShadow: ['0 0 20px rgba(168,85,247,0.3)', '0 0 40px rgba(6,182,212,0.4)', '0 0 20px rgba(168,85,247,0.3)'] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-purple-500/60 to-cyan-500/60 p-1 relative z-10"
            >
              <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-900 border-2 border-gray-900">
                <img 
                  src={profilePic} 
                  alt="Sunny Kumar" 
                  className="w-full h-full object-cover scale-[1.05] group-hover:scale-[1.15] transition-transform duration-700 ease-out" 
                />
                
                {/* Hover Overlay Text */}
                <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 backdrop-blur-[3px] transition-all duration-500 flex flex-col items-center justify-center text-center p-2 sm:p-4">
                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 flex flex-col items-center justify-center w-full">
                     <span className="text-white font-black text-sm sm:text-xl md:text-2xl drop-shadow-lg leading-tight uppercase tracking-wider m-0 p-0" style={{ color: 'white' }}>
                       Java <span className="text-cyan-400" style={{ color: '#22d3ee' }}>&</span> MERN
                     </span>
                     <div className="h-[2px] w-8 sm:w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent my-1 sm:my-2" />
                     <span className="text-[10px] sm:text-xs md:text-sm text-purple-300 uppercase tracking-[0.25em] font-bold m-0 p-0" style={{ color: '#d8b4fe' }}>
                       DSA EXPERT
                     </span>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Orbit Nodes */}
          {orbitNodes.map((node, index) => {
            const total = orbitNodes.length;
            // -90 to start at the top
            const angle = (index / total) * 360 - 90;
            
            // Normalize angle to check if it's in the bottom half
            let normalizedAngle = angle % 360;
            if (normalizedAngle < 0) normalizedAngle += 360;
            const isBottomHalf = normalizedAngle > 0 && normalizedAngle < 180;

            const rad = (angle * Math.PI) / 180;
            const radiusPercent = 50; // Placed exactly on the edge of the container
            const x = Math.cos(rad) * radiusPercent;
            const y = Math.sin(rad) * radiusPercent;

            return (
              <motion.div
                key={node.title}
                className="absolute z-30"
                style={{
                  left: `calc(50% + ${x}%)`,
                  top: `calc(50% + ${y}%)`,
                }}
                initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
                whileInView={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                viewport={viewportOnce}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 120 }}
                onMouseEnter={() => setHoveredNode(index)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="flex flex-col items-center group cursor-default relative">
                  {/* Icon Circle */}
                  <motion.div 
                    whileHover={{ scale: 1.15 }}
                    className={`w-14 h-14 md:w-20 md:h-20 rounded-full glass border flex items-center justify-center text-2xl md:text-4xl mb-2 shadow-xl transition-all duration-300 relative z-10
                      ${hoveredNode === index ? 'border-purple-500/60 bg-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.5)]' : 'border-white/15 bg-gray-800/90 hover:bg-gray-700/90'}`}
                  >
                    {node.icon}
                  </motion.div>
                  
                  {/* Category Title */}
                  <span className={`text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide transition-colors duration-300 bg-gray-900/90 px-4 py-1.5 rounded-full border backdrop-blur-sm whitespace-nowrap shadow-lg
                    ${hoveredNode === index ? 'text-white border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'text-gray-300 border-white/10'}`}>
                    {node.title}
                  </span>
                  
                  {/* Tooltip showing specific skills */}
                  <div className={`absolute ${isBottomHalf ? 'bottom-[calc(100%+0.5rem)] origin-bottom' : 'top-[calc(100%+0.5rem)] origin-top'} w-max bg-gray-900/95 border border-white/10 rounded-xl p-3 md:p-4 shadow-2xl backdrop-blur-xl z-40 transition-all duration-300 transform
                    ${hoveredNode === index 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : `opacity-0 scale-95 pointer-events-none ${isBottomHalf ? 'translate-y-2' : '-translate-y-2'}`
                    }`}>
                    <ul className="text-xs md:text-sm text-gray-300 space-y-2 text-center">
                      {node.skills.map((skill, i) => (
                        <li key={i} className="whitespace-nowrap px-3 py-1.5 bg-white/5 rounded-md border border-white/5 hover:bg-white/10 transition-colors">{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
