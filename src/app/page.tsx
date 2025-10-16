'use client';

import { motion } from 'framer-motion';
import HardButton from '@/components/HardButton';
import PhraseGenerator from '@/components/PhraseGenerator';
import { prepareTTS, getTTSStatus, testSpeak } from '@/lib/textToSpeech';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
            >
              HARD
            </motion.h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 mt-6"
          >
            Tenta ai! Clique no botão HARD ou teste o gerador de frases.
          </motion.p>
        </div>

        {/* Audio Prep Banner */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center justify-between gap-4 bg-white/70 border border-pink-200 rounded-xl px-4 py-3">
            <div className="text-sm text-gray-700">
              Se não ouvir a voz, ative o áudio aqui primeiro.
            </div>
            <button
              onClick={async () => {
                const before = getTTSStatus();
                console.log('TTS before', before);
                await prepareTTS();
                await testSpeak();
                const after = getTTSStatus();
                console.log('TTS after', after);
              }}
              className="px-3 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
            >
              Ativar Voz
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Hard Button Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-pink-200"
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Botão HARD Gigante
              </h2>
              <p className="text-gray-600">
                Da uma testada ai :)
              </p>
            </div>
            <HardButton />
          </motion.div>

          {/* Phrase Generator Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-purple-200"
          >
            <PhraseGenerator />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500">
            Vai tomando
          </p>
        </motion.div>
      </div>
    </main>
  );
}