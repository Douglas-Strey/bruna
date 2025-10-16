'use client';

import { motion, easeInOut, easeOut } from 'framer-motion';
import Image from 'next/image';

interface BrunaPhotoProps {
  show: boolean;
  animationType?: 'shake' | 'zoom' | 'fade' | 'bounce';
  size?: 'small' | 'medium' | 'large';
}

export default function BrunaPhoto({ 
  show, 
  animationType = 'shake', 
  size = 'medium' 
}: BrunaPhotoProps) {
  const sizeClasses = {
    small: 'w-24 h-24 sm:w-32 sm:h-32',
    medium: 'w-32 h-32 sm:w-40 md:w-48 sm:h-40 md:h-48',
    large: 'w-48 h-48 sm:w-56 md:w-64 sm:h-56 md:h-64'
  };

  const animations = {
    shake: {
      initial: { x: 0, rotate: 0 },
      animate: { 
        x: [-10, 10, -10, 10, 0],
        rotate: [-5, 5, -5, 5, 0],
        transition: { duration: 0.5, ease: easeInOut }
      }
    },
    zoom: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { 
        scale: [0.8, 1.2, 1],
        opacity: [0, 1, 1],
        transition: { duration: 0.6, ease: easeOut }
      }
    },
    fade: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: [0, 1],
        y: [20, 0],
        transition: { duration: 0.5, ease: easeOut }
      }
    },
    bounce: {
      initial: { y: 0 },
      animate: { 
        y: [-20, 0, -10, 0],
        transition: { duration: 0.8, ease: easeOut }
      }
    }
  };

  if (!show) return null;

  return (
    <motion.div
      className={`${sizeClasses[size]} relative mx-auto`}
      initial={animations[animationType].initial}
      animate={animations[animationType].animate}
    >
      <Image
        src="/bruna.jpg"
        alt="Bruna"
        fill
        className="rounded-full object-cover shadow-2xl border-4 border-pink-300"
        priority
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-200/20 to-purple-200/20"></div>
    </motion.div>
  );
}
