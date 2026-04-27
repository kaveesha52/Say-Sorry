import { useEffect, useRef } from "react";

const SONG_URL = "/audio/cute-song.mp3";

export function AutoPlayAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(SONG_URL);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
    audioRef.current = audio;

    // Try to autoplay (browsers usually block this without user gesture)
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {
          // User gesture needed - handled by listener below
        });
      }
    };

    // Autoplay on first user interaction
    const startOnInteraction = () => {
      playAudio();
      // Remove listeners after first successful interaction
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
    };

    window.addEventListener("click", startOnInteraction);
    window.addEventListener("touchstart", startOnInteraction);
    window.addEventListener("keydown", startOnInteraction);

    // Try autoplay on load
    playAudio();

    return () => {
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  return null; // No UI, just autoplay
}
