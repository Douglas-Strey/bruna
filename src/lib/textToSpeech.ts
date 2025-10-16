// Robust voice loading and warm-up to avoid robotic first utterance
let speechInitialized = false;
let voicesReadyPromise: Promise<SpeechSynthesisVoice[]> | null = null;

const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve([]);
  }

  const synth = window.speechSynthesis;
  const existing = synth.getVoices();
  if (existing && existing.length > 0) {
    return Promise.resolve(existing);
  }

  if (!voicesReadyPromise) {
    voicesReadyPromise = new Promise((resolve) => {
      const handle = () => {
        const v = synth.getVoices();
        if (v && v.length > 0) {
          synth.onvoiceschanged = null;
          resolve(v);
        }
      };
      // Some browsers fire onvoiceschanged asynchronously
      synth.onvoiceschanged = handle;
      // Fallback polling in case onvoiceschanged never fires (Safari quirks)
      const start = Date.now();
      const timer = setInterval(() => {
        const v = synth.getVoices();
        if (v && v.length > 0) {
          clearInterval(timer);
          synth.onvoiceschanged = null;
          resolve(v);
        } else if (Date.now() - start > 3000) {
          clearInterval(timer);
          resolve([]);
        }
      }, 150);
    });
  }
  return voicesReadyPromise;
};

const initializeSpeech = async (preferredVoice?: SpeechSynthesisVoice) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window && !speechInitialized) {
    const synth = window.speechSynthesis;
    // Warm-up using the same target voice with zero volume
    const warmUp = new SpeechSynthesisUtterance('.');
    warmUp.volume = 0;
    if (preferredVoice) warmUp.voice = preferredVoice;
    synth.speak(warmUp);
    speechInitialized = true;
  }
};

// Expose a prep function to be invoked on first user gesture
export const prepareTTS = async () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const voices = await loadVoices();
  const preferred = voices.find(v => /pt-BR/i.test(v.lang)) || voices.find(v => /^pt/i.test(v.lang));
  await initializeSpeech(preferred);
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
  await speakText('Hard que sim!', 0.92, 1.0);
};

export const speakText = async (text: string, rate: number = 0.92, pitch: number = 1.0) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const synth = window.speechSynthesis;
    const voices = await loadVoices();

    // Prefer pt-BR, then any pt, then any local/default
    const brazilian = voices.find(v => /pt-BR/i.test(v.lang));
    const portuguese = brazilian || voices.find(v => /^pt/i.test(v.lang));
    const local = portuguese || voices[0];

    await initializeSpeech(local);

    // Build utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Math.min(1.2, Math.max(0.6, rate));
    utterance.pitch = Math.min(2, Math.max(0.5, pitch));
    utterance.volume = 0.95;
    if (local) utterance.voice = local;

    // Retry logic: some browsers ignore the first speak after cancel/getVoices
    const trySpeak = (attempt: number) => {
      // Cancel anything queued, then speak
      synth.cancel();
      synth.speak(utterance);

      // If it didn't start within 400ms, retry up to 2 times
      const timeout = setTimeout(() => {
        if (!synth.speaking && attempt < 2) {
          trySpeak(attempt + 1);
        } else if (!synth.speaking && attempt >= 2) {
          // Last-resort fallback: speak without custom voice immediately
          const fallback = new SpeechSynthesisUtterance(text);
          fallback.volume = 1;
          fallback.rate = utterance.rate;
          fallback.pitch = utterance.pitch;
          synth.speak(fallback);
        }
      }, 400);

      utterance.onstart = () => clearTimeout(timeout);
      utterance.onend = () => clearTimeout(timeout);
    };

    trySpeak(0);
  }
};

export const speakHardPhrase = () => {
  const hardPhrases = [
    "HAAAARRRRD!",
    "HARD QUE SIM!",
    "HARD QUE SIM, AMIGO!",
    "HARD DEMAIS!",
    "HARD PRA CARAMBA!",
    "HARD QUE SIM, MANO!",
    "HARD QUE SIM, GENTE!",
    "HARD MANO!?!?!"
  ];
  
  const randomPhrase = hardPhrases[Math.floor(Math.random() * hardPhrases.length)];
  speakText(randomPhrase, 0.9, 1.3);
};
