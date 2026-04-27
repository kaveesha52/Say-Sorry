'use client';

import React, { useState } from 'react';

export default function Home() {
  const [forgiven, setForgiven] = useState(false);
  const [dodgeStyle, setDodgeStyle] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const noBtnRef = React.useRef<HTMLButtonElement>(null);

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
    'no',
    'are you sure?',
    'really?',
    'pretty please?',
    'with a cherry on top?',
    'okay last try...',
    'please?? 🥺',
  ];

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-50px`,
              animation: `float ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Audio player */}
      <audio
        autoPlay
        loop
        muted
        onLoadedMetadata={(e) => {
          const audio = e.currentTarget as HTMLAudioElement;
          audio.muted = false;
          audio.volume = 0.4;
        }}
        style={{ display: 'none' }}
      >
        <source src="/audio/cute-song.mp3" type="audio/mpeg" />
      </audio>

      {/* Main content */}
      <section className="relative z-10 w-full max-w-xl">
        <div className="rounded-3xl bg-white/90 p-8 shadow-2xl sm:p-12 text-center backdrop-blur-sm border border-pink-200">
          {!forgiven ? (
            <>
              <div className="mb-4 text-7xl animate-pulse">🌸</div>

              <h1 className="text-5xl font-bold text-pink-600 sm:text-6xl font-caveat drop-shadow-sm">
                I'm Sorry
              </h1>

              <p className="mt-4 text-2xl text-pink-500 sm:text-3xl font-caveat">
                ...my love 💕
              </p>

              <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                I messed up, and I'm really sorry. You're the sweetest part of my day,
                and the last thing I ever want is to make you sad. Please know that
                every smile of yours means the world to me.
              </p>

              <div className="my-7 flex items-center justify-center gap-2 text-2xl">
                <span className="animate-bounce inline-block">💗</span>
              </div>

              <p className="mb-6 text-2xl text-pink-600 font-caveat">
                Will you forgive me?
              </p>

              <div className="relative flex h-24 items-center justify-center gap-4">
                <button
                  onClick={() => setForgiven(true)}
                  className="rounded-full bg-gradient-to-r from-pink-400 to-rose-400 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  Yes 💖
                </button>

                <button
                  ref={noBtnRef}
                  onMouseEnter={handleNoHover}
                  onFocus={handleNoHover}
                  onTouchStart={handleNoHover}
                  style={{
                    transform: `translate(${dodgeStyle.x}px, ${dodgeStyle.y}px)`,
                    transition: 'transform 0.25s ease-out',
                  }}
                  className="rounded-full border-2 border-pink-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:text-pink-600"
                >
                  {noMessages[Math.min(dodgeCount, noMessages.length - 1)]}
                </button>
              </div>

              <p className="mt-6 text-xs text-gray-500">
                (psst… the "no" button is a little shy 🌷)
              </p>
            </>
          ) : (
            <div className="animate-in fade-in duration-500">
              <div className="relative mx-auto mb-3 w-56 sm:w-64">
                <div className="text-center text-8xl animate-bounce">🎁</div>
              </div>
              <h2 className="text-5xl text-pink-600 sm:text-6xl font-bold font-caveat">
                Thank you, my love
              </h2>
              <p className="mt-5 text-base leading-relaxed text-gray-700 sm:text-lg">
                You make my whole world brighter. I promise to do better, to listen
                more, and to love you a little louder every single day. 🌷
              </p>
              <p className="mt-6 text-3xl text-pink-500 font-caveat">
                Forever yours 💕
              </p>

              <button
                onClick={() => {
                  setForgiven(false);
                  setDodgeCount(0);
                  setDodgeStyle({ x: 0, y: 0 });
                }}
                className="mt-8 rounded-full border-2 border-pink-300 bg-white px-5 py-2 text-sm text-gray-700 transition hover:text-pink-600"
              >
                ↺ read again
              </button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          made with 💕 just for you
        </p>
      </section>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @font-face {
          font-family: 'Caveat';
          src: url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700');
        }

        .font-caveat {
          font-family: 'Caveat', cursive;
        }
      `}</style>
    </main>
  );
}
