import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "I'm Sorry, My Love 💕",
  description: 'A little note from me to you — because you mean the world to me.',
  keywords: ['sorry', 'love', 'apology'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Quicksand:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
