import { useRef, useCallback } from 'react';

/**
 * useSound — plays a soft click sound.
 * Place mouse-sound.mp3 in: public/sounds/mouse-sound.mp3
 * Volume is kept at 0.5 so it's clearly audible but premium.
 */
const useSound = (src = '/sounds/mouse-sound.mp3', volume = 0.5) => {
  const audioRef = useRef(null);

  const play = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(src);
        audioRef.current.volume = volume;
      }
      // Reset and play (allows rapid-fire clicks)
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Silently fail if browser blocks autoplay
      });
    } catch {
      // Silently fail
    }
  }, [src, volume]);

  return play;
};

export default useSound;
