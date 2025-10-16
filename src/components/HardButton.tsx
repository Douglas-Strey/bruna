'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import BrunaPhoto from './BrunaPhoto';
import { speakHardPhrase } from '@/lib/textToSpeech';

export default function HardButton() {
  const [clickCount, setClickCount] = useState(0);
  const [showPhoto, setShowPhoto] = useState(false);
  const [animationType, setAnimationType] = useState<'shake' | 'zoom' | 'fade' | 'bounce'>('shake');

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff69b4']
    });

    // Show photo with random animation
    const animations: Array<'shake' | 'zoom' | 'fade' | 'bounce'> = ['shake', 'zoom', 'fade', 'bounce'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    setAnimationType(randomAnimation);
    setShowPhoto(true);

    // Speak hard phrase
    speakHardPhrase();

    // Hide photo after animation
    setTimeout(() => {
      setShowPhoto(false);
    }, 2000);

    // Special animation for milestone clicks
    if (clickCount > 0 && clickCount % 10 === 0) {
      // Mega confetti for every 10 clicks
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff69b4', '#ffd700', '#ffa500']
      });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.button
        onClick={handleClick}
        className="relative px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-2xl sm:text-3xl md:text-4xl font-bold rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(255, 105, 180, 0.3)',
            '0 0 40px rgba(255, 105, 180, 0.6)',
            '0 0 20px rgba(255, 105, 180, 0.3)'
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <span className="relative z-10">HARD</span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </motion.button>

      {clickCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-lg text-gray-600">
            Clicado <span className="font-bold text-pink-600">{clickCount}</span> vezes!
          </p>
          {clickCount % 10 === 0 && clickCount > 0 && (
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold text-purple-600 mt-2"
            >
              🎉 MILESTONE! 🎉
            </motion.p>
          )}
        </motion.div>
      )}

      <BrunaPhoto 
        show={showPhoto} 
        animationType={animationType}
        size="large"
      />
    </div>
  );
}
