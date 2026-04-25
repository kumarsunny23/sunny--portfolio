import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('.cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Main trailing ring */}
      <motion.div
        className="cursor-ring"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
        style={{
          width: '40px',
          height: '40px',
          border: `1.5px solid ${isHovering ? '#06b6d4' : '#7c3aed'}`,
          background: isHovering ? 'rgba(6,182,212,0.1)' : 'transparent',
          boxShadow: isHovering 
            ? '0 0 15px rgba(6,182,212,0.4), inset 0 0 10px rgba(6,182,212,0.2)' 
            : '0 0 10px rgba(124,58,237,0.3)',
        }}
      >
        {/* Crosshair lines that appear on hover */}
        <motion.div 
          className="absolute top-1/2 left-[-8px] right-[-8px] h-[1px] bg-cyan-400/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div 
          className="absolute left-1/2 top-[-8px] bottom-[-8px] w-[1px] bg-cyan-400/50"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Sharp center dot */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.1
        }}
        style={{
          width: '6px',
          height: '6px',
          background: '#c4b5fd',
          boxShadow: '0 0 8px 2px rgba(124,58,237,0.6)'
        }}
      />
    </>
  );
};

export default CustomCursor;
