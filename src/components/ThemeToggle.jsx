import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import useSound from '../hooks/useSound';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const playClick = useSound();

  const handleToggle = () => {
    playClick();
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #8B5CF6, #06B6D4)'
          : 'linear-gradient(135deg, #f59e0b, #ef4444)',
      }}
      aria-label="Toggle dark/light mode"
    >
      <motion.div
        className="w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center text-[10px]"
        animate={{ x: isDark ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? '🌙' : '☀️'}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
