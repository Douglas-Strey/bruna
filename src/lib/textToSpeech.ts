export const speakText = (text: string, rate: number = 0.8, pitch: number = 1.2) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 0.8;
    
    // Try to use a Brazilian Portuguese voice if available
    const voices = window.speechSynthesis.getVoices();
    const brazilianVoice = voices.find(voice => 
      voice.lang.includes('pt-BR') || voice.lang.includes('pt')
    );
    
    if (brazilianVoice) {
      utterance.voice = brazilianVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }
};

export const speakHardPhrase = (phrase: string) => {
  const hardPhrases = [
    "HARD QUE SIM!",
    "HARD QUE SIM, AMIGO!",
    "HARD DEMAIS!",
    "HARD PRA CARAMBA!",
    "HARD QUE NÃO!",
    "HARD QUE SIM, GALERA!"
  ];
  
  const randomPhrase = hardPhrases[Math.floor(Math.random() * hardPhrases.length)];
  speakText(randomPhrase, 0.9, 1.3);
};
