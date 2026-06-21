"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { canSpeak, speakChinese, stopSpeaking } from "@/lib/tts";

type SpeakButtonProps = {
  text: string;
};

export function SpeakButton({ text }: SpeakButtonProps) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSupported(canSpeak());
    }, 0);
    return () => {
      window.clearTimeout(timer);
      stopSpeaking();
    };
  }, []);

  function handleClick() {
    if (!supported) return;

    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }

    const started = speakChinese(text);
    setSpeaking(started);
    if (started) {
      window.setTimeout(() => setSpeaking(false), Math.max(1600, text.length * 420));
    }
  }

  return (
    <button
      className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold ${
        supported ? "bg-mint text-leaf" : "cursor-not-allowed bg-slate-100 text-slate-400"
      }`}
      disabled={!supported}
      onClick={handleClick}
      type="button"
    >
      {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
      {supported ? (speaking ? "Dung doc" : "Nghe") : "Khong ho tro"}
    </button>
  );
}
