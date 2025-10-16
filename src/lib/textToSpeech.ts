// Versão simplificada (a que estava funcionando): usa getVoices diretamente e fala
// sem aquecimentos complexos. Mantemos algumas funções utilitárias como no-ops
// para não quebrar imports existentes.

let speechInitialized = false;

const initializeSpeech = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  if (speechInitialized) return;
  // Inicia de forma simples (sem utterance silenciosa)
  speechInitialized = true;
};

// Expose a prep function to be invoked on first user gesture
export const prepareTTS = async () => {
  initializeSpeech();
};

export const getTTSStatus = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return { supported: false, voices: 0, speaking: false, pending: false };
  }
  const synth = window.speechSynthesis;
  const voices = synth.getVoices()?.length || 0;
  return { supported: true, voices, speaking: synth.speaking, pending: synth.pending };
};

export const testSpeak = async () => {
  speakText('Hard que sim!', 0.92, 1.0);
};

export const speakText = (text: string, rate: number = 0.8, pitch: number = 1.2) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    initializeSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const brazilianVoice = voices.find(v => /pt-BR/i.test(v.lang)) || voices.find(v => /^pt/i.test(v.lang));
    if (brazilianVoice) utterance.voice = brazilianVoice;

    window.speechSynthesis.speak(utterance);
  }
};

export const speakHardPhrase = () => {
  const hardPhrases = [
    'HAAAARRRRD!',
    'HARD QUE SIM!',
    'HARD QUE SIM, AMIGO!',
    'HARD DEMAIS!',
    'HARD PRA CARAMBA!',
    'HARD QUE SIM, MANO!',
    'HARD QUE SIM, GENTE!',
    'HARD MANO!?!?!'
  ];
  const randomPhrase = hardPhrases[Math.floor(Math.random() * hardPhrases.length)];
  speakText(randomPhrase, 0.9, 1.3);
};
