import { useEffect, useRef, useState } from "react";

export function AutoPlayAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.4;
        audioRef.current
          .play()
          .then(() => {
            console.log("Audio is playing!");
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Autoplay prevented, waiting for user interaction...", err);
          });
      }
    };

    // Try to play immediately
    setTimeout(playAudio, 100);

    // If autoplay blocked, play on first interaction
    const playOnInteraction = () => {
      if (!isPlaying && audioRef.current) {
        playAudio();
        document.removeEventListener("click", playOnInteraction);
        document.removeEventListener("touchstart", playOnInteraction);
      }
    };

    document.addEventListener("click", playOnInteraction);
    document.addEventListener("touchstart", playOnInteraction);

    return () => {
      document.removeEventListener("click", playOnInteraction);
      document.removeEventListener("touchstart", playOnInteraction);
    };
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      style={{ display: "none" }}
    >
      <source src="/audio/cute-song.mp3" type="audio/mpeg" />
    </audio>
  );
}
