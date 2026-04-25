import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — fixed top bar that shows page scroll progress.
 * Width driven by Framer Motion useScroll → scaleX.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, transformOrigin: '0%' }}
    />
  );
};

export default ScrollProgress;
