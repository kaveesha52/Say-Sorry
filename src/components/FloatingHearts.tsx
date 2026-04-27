import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  drift: number;
  emoji: string;
}

const emojis = ["💗", "💕", "🌸", "💖", "🌷", "💞"];

export function FloatingHearts({ count = 14 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 10,
      size: 14 + Math.random() * 18,
      drift: (Math.random() - 0.5) * 120,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-float-up select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            ["--drift" as string]: `${h.drift}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
