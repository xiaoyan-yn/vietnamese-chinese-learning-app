function getSpeechSynthesis() {
  if (typeof window === "undefined") return undefined;
  return window.speechSynthesis;
}

export function canSpeak() {
  return Boolean(getSpeechSynthesis());
}

export function stopSpeaking() {
  const synth = getSpeechSynthesis();
  if (!synth) return;
  synth.cancel();
}

export function speakChinese(text: string) {
  const synth = getSpeechSynthesis();
  if (!synth || !text.trim()) return false;

  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.86;
  utterance.pitch = 1;

  const voices = synth.getVoices();
  const chineseVoice = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith("zh"),
  );
  if (chineseVoice) {
    utterance.voice = chineseVoice;
  }

  synth.speak(utterance);
  return true;
}
