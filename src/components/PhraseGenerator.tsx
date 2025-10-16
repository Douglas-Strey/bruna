'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import BrunaPhoto from './BrunaPhoto';
import { speakText } from '@/lib/textToSpeech';

export default function PhraseGenerator() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [showPhoto, setShowPhoto] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateResponse = () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    setShowPhoto(false);

    // Simulate thinking time
    setTimeout(() => {
      const responses = [
        "HARD QUE SIM, AMIGO!",
        "HARD QUE SIM!",
        "HARD DEMAIS!",
        "HARD PRA CARAMBA!",
        "HARD QUE SIM, GALERA!",
        "HARD QUE SIM, MANO!",
        "HARD QUE SIM, PESSOAL!"
      ];

      const negativeResponses = [
        "HARD QUE NÃO!",
        "HARD QUE NÃO, AMIGO!"
      ];

      // Simple logic: if input contains negative words, respond with negative
      const negativeWords = ['não', 'nunca', 'jamais', 'impossível', 'difícil', 'problema'];
      const hasNegative = negativeWords.some(word => 
        inputText.toLowerCase().includes(word)
      );

      const selectedResponse = hasNegative 
        ? negativeResponses[Math.floor(Math.random() * negativeResponses.length)]
        : responses[Math.floor(Math.random() * responses.length)];

      setResponse(selectedResponse);
      setShowPhoto(true);
      setIsGenerating(false);

      // Speak the response
      speakText(selectedResponse, 0.9, 1.2);

      // Hide photo after animation
      setTimeout(() => {
        setShowPhoto(false);
      }, 3000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateResponse();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Gerador de Frases HARD
        </h2>
        <p className="text-gray-600">
          Digite algo e veja a resposta da Bruna!
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ex: Quero comer pizza..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-pink-300 rounded-lg focus:border-pink-500 focus:outline-none text-base sm:text-lg text-gray-800 placeholder-gray-500"
          disabled={isGenerating}
        />

        <motion.button
          onClick={generateResponse}
          disabled={!inputText.trim() || isGenerating}
          className="w-full py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm sm:text-base"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              ⏳
            </motion.div>
          ) : (
            'Gerar Resposta HARD!'
          )}
        </motion.button>
      </div>

      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg border-2 border-pink-200">
            <p className="text-xl font-bold text-gray-800 mb-2">
              &quot;{inputText}&quot;
            </p>
            <p className="text-2xl font-bold text-pink-600">
              {response}
            </p>
          </div>

          <BrunaPhoto 
            show={showPhoto} 
            animationType="zoom"
            size="medium"
          />
        </motion.div>
      )}
    </div>
  );
}
