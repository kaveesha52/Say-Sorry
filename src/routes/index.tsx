import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { AutoPlayAudio } from "@/components/AutoPlayAudio";
import bouquetImg from "@/assets/bouquet.png";
import boyBouquetImg from "@/assets/boy-bouquet.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "I'm Sorry, Kavee 🥺💕" },
      {
        name: "description",
        content: "A little note from me to you — because you mean the world to me.",
      },
      { property: "og:title", content: "I'm Sorry, Kavee 🥺💕" },
      {
        property: "og:description",
        content: "A little note from me to you — because you mean the world to me.",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Quicksand:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [forgiven, setForgiven] = useState(false);
  const [dodgeStyle, setDodgeStyle] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const handleNoHover = () => {
    const parent = noBtnRef.current?.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const maxX = rect.width / 2 - 60;
    const maxY = 80;
    setDodgeStyle({
      x: (Math.random() - 0.5) * maxX * 2,
      y: (Math.random() - 0.5) * maxY,
    });
    setDodgeCount((c) => c + 1);
  };

  const noMessages = [
    "no",
    "are you sure?",
    "really?",
    "pretty please?",
    "with a cherry on top?",
    "okay last try...",
    "please?? 🥺",
  ];

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <FloatingHearts count={16} />
      <AutoPlayAudio />

      <section className="relative z-10 w-full max-w-xl">
        <div className="animate-fade-up rounded-3xl bg-gradient-card p-8 shadow-soft sm:p-12 text-center backdrop-blur-sm border border-border/60">
          {!forgiven ? (
            <>
              <div className="animate-bob mb-4 text-7xl" aria-hidden="true">
                🌸
              </div>

              <h1 className="font-display animate-shimmer text-5xl text-primary sm:text-6xl">
                I'm Sorry
              </h1>

              <p className="mt-4 font-display text-2xl text-foreground/80 sm:text-3xl">
                ...my love 💕
              </p>

              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                I messed up, and I'm really sorry. You're the sweetest part of my day,
                and the last thing I ever want is to make you sad.I Didn't mean to annoy you. Please know that
                every smile of yours means the world to me.
              </p>

              <div className="my-7 flex items-center justify-center gap-2 text-2xl">
                <span className="animate-heartbeat inline-block">💗</span>
              </div>

              <p className="mb-6 font-display text-2xl text-primary">
                Will you forgive me?
              </p>

              <div className="relative flex h-24 items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setForgiven(true)}
                  className="rounded-full bg-gradient-button px-8 py-3 font-semibold text-primary-foreground shadow-petal transition-all duration-300 hover:scale-110 hover:shadow-soft active:scale-95"
                >
                  Yes 💖
                </button>

                <button
                  ref={noBtnRef}
                  type="button"
                  onMouseEnter={handleNoHover}
                  onFocus={handleNoHover}
                  onTouchStart={handleNoHover}
                  style={{
                    transform: `translate(${dodgeStyle.x}px, ${dodgeStyle.y}px)`,
                    transition: "transform 0.25s ease-out",
                  }}
                  className="rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {noMessages[Math.min(dodgeCount, noMessages.length - 1)]}
                </button>
              </div>

              <p className="mt-6 text-xs text-muted-foreground/80">
                (psst… the "no" button is a little shy 🌷)
              </p>
            </>
          ) : (
            <div className="animate-fade-up">
              <div className="relative mx-auto mb-3 w-56 sm:w-64" aria-hidden="true">
                <div className="animate-offer animate-sway">
                  <img
                    src={boyBouquetImg}
                    alt="A little boy offering you a bouquet of flowers"
                    width={768}
                    height={1024}
                    loading="lazy"
                    className="h-auto w-full drop-shadow-[0_20px_30px_rgba(244,114,182,0.35)]"
                  />
                </div>
                <span className="absolute -right-2 top-4 animate-heartbeat text-3xl">💗</span>
                <span className="absolute -left-1 top-12 animate-heartbeat text-2xl" style={{ animationDelay: "0.4s" }}>💕</span>
              </div>
              <h2 className="font-display text-5xl text-primary sm:text-6xl">
                Thank you, Baby 🥺💕
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                You make my whole world brighter. That why i said what i said. Its the truth but more importantly i value your smile and free mind.
                I will be there for you no matter what. I promise to be there for youlouder every single day. 🌷 Baby one more thing try not to show this to anyone kinda feel shy im not used to do things like this 😅💞.
              </p>
              <p className="mt-6 font-display text-3xl text-primary/90">
                yours 💕
              </p>

              <button
                type="button"
                onClick={() => {
                  setForgiven(false);
                  setDodgeCount(0);
                  setDodgeStyle({ x: 0, y: 0 });
                }}
                className="mt-8 rounded-full border border-border bg-background/70 px-5 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              >
                ↺ read again
              </button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground/80">
          made with 💕 for you
        </p>
      </section>
    </main>
  );
}
