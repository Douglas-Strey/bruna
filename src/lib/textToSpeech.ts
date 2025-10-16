// Alternativa: usar Web Audio API para gerar sons em vez de TTS
// Isso garante que sempre vai ter som, independente do navegador

let audioContext: AudioContext | null = null;

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

const playBeep = (frequency: number = 440, duration: number = 200) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  // Fade in/out for smoother sound
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration / 1000);
};

// Mapear frases para diferentes frequências/durações
const phraseToSound = (phrase: string) => {
  const lowerPhrase = phrase.toLowerCase();
  
  if (lowerPhrase.includes('hard')) {
    // Som mais grave e longo para "HARD"
    playBeep(220, 300);
    setTimeout(() => playBeep(330, 200), 100);
    setTimeout(() => playBeep(440, 150), 200);
  } else if (lowerPhrase.includes('sim')) {
    // Som ascendente para "SIM"
    playBeep(330, 150);
    setTimeout(() => playBeep(440, 150), 100);
    setTimeout(() => playBeep(550, 200), 200);
  } else if (lowerPhrase.includes('não')) {
    // Som descendente para "NÃO"
    playBeep(550, 150);
    setTimeout(() => playBeep(440, 150), 100);
    setTimeout(() => playBeep(330, 200), 200);
  } else {
    // Som padrão
    playBeep(440, 200);
  }
};

export const speakText = (text: string) => {
  phraseToSound(text);
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
  phraseToSound(randomPhrase);
};

// Funções de compatibilidade (no-ops)
export const prepareTTS = async () => {};
export const getTTSStatus = () => ({ supported: true, voices: 0, speaking: false, pending: false });
export const testSpeak = async () => {
  phraseToSound('Hard que sim!');
};