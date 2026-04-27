import { useEffect, useRef, useState } from "react";

const SONG_URL = "/audio/cute-song.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = new Audio(SONG_URL);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
    audioRef.current = audio;

    const onError = () => setError(true);
    audio.addEventListener("error", onError);

    // Try to autoplay (browsers usually block this)
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        /* user gesture needed — handled below */
      });

    // Start music on the FIRST user interaction anywhere on the page
    const startOnInteraction = () => {
      const a = audioRef.current;
      if (!a || !a.paused) return;
      a.play()
        .then(() => {
          setPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          /* still blocked, user can tap the toggle */
        });
    };

    window.addEventListener("click", startOnInteraction, { once: false });
    window.addEventListener("touchstart", startOnInteraction, { once: false });
    window.addEventListener("keydown", startOnInteraction, { once: false });

    return () => {
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setHasInteracted(true);
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setError(false);
        })
        .catch(() => {
          setPlaying(false);
          setError(true);
        });
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-button text-primary-foreground shadow-soft transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <span className="text-2xl" aria-hidden="true">
          {playing ? "🎵" : "▶️"}
        </span>
        {!playing && (
          <span className="pointer-events-none absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
        )}
      </button>

      {!playing && !hasInteracted && !error && (
        <div className="fixed bottom-24 right-5 z-50 max-w-[220px] animate-fade-up rounded-2xl bg-card/95 px-4 py-3 text-center shadow-petal backdrop-blur-sm border border-border/60">
          <p className="font-display text-lg text-primary leading-tight">
            tap anywhere to play music 💕
          </p>
        </div>
      )}

      {error && (
        <div className="fixed bottom-24 right-5 z-50 max-w-[220px] rounded-2xl bg-card/95 px-4 py-2 text-xs text-muted-foreground shadow-petal backdrop-blur-sm border border-border/60">
          tap the ▶️ button to play
        </div>
      )}
    </>
  );
}
