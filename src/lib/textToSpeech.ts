// Versão híbrida: TTS com fallback para Web Audio
// Primeiro tenta falar, se falhar usa beeps musicais

let audioContext: AudioContext | null = null;
let ttsWorking = true; // Flag para saber se TTS está funcionando

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  try {
    // @ts-expect-error WebKit prefix
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!audioContext) audioContext = new Ctx();
    return audioContext;
  } catch {
    return null;
  }
};

// Fallback: Web Audio com beeps musicais
const playBeep = (frequency: number = 440, duration: number = 200) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration / 1000);
};

const phraseToSound = (phrase: string) => {
  const lowerPhrase = phrase.toLowerCase();
  
  if (lowerPhrase.includes('hard')) {
    playBeep(220, 300);
    setTimeout(() => playBeep(330, 200), 100);
    setTimeout(() => playBeep(440, 150), 200);
  } else if (lowerPhrase.includes('sim')) {
    playBeep(330, 150);
    setTimeout(() => playBeep(440, 150), 100);
    setTimeout(() => playBeep(550, 200), 200);
  } else if (lowerPhrase.includes('não')) {
    playBeep(550, 150);
    setTimeout(() => playBeep(440, 150), 100);
    setTimeout(() => playBeep(330, 200), 200);
  } else {
    playBeep(440, 200);
  }
};

// TTS principal com fallback
export const speakText = (text: string, rate: number = 0.8, pitch: number = 1.2) => {
  if (!ttsWorking || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    phraseToSound(text);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = 0.9;

  const voices = window.speechSynthesis.getVoices();
  const brazilianVoice = voices.find(v => /pt-BR/i.test(v.lang)) || voices.find(v => /^pt/i.test(v.lang));
  if (brazilianVoice) utterance.voice = brazilianVoice;

  // Detectar se TTS falhou
  let hasStarted = false;
  utterance.onstart = () => {
    hasStarted = true;
  };
  
  utterance.onerror = (e) => {
    console.log('TTS error, switching to beeps:', e.error);
    ttsWorking = false;
    phraseToSound(text);
  };

  utterance.onend = () => {
    if (!hasStarted) {
      console.log('TTS did not start, switching to beeps');
      ttsWorking = false;
      phraseToSound(text);
    }
  };

  window.speechSynthesis.speak(utterance);

  // Fallback timeout: se não começou em 1 segundo, usa beeps
  setTimeout(() => {
    if (!hasStarted) {
      console.log('TTS timeout, switching to beeps');
      ttsWorking = false;
      phraseToSound(text);
    }
  }, 1000);
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

// Funções de compatibilidade
export const prepareTTS = async () => {
  // Reset flag para tentar TTS novamente
  ttsWorking = true;
};

export const getTTSStatus = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return { supported: false, voices: 0, speaking: false, pending: false };
  }
  const synth = window.speechSynthesis;
  const voices = synth.getVoices()?.length || 0;
  return { 
    supported: true, 
    voices, 
    speaking: synth.speaking, 
    pending: synth.pending,
    ttsWorking 
  };
};

export const testSpeak = async () => {
  speakText('Hard que sim!', 0.92, 1.0);
};