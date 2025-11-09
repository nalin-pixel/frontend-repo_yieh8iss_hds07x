import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import FeatureGrid from './components/FeatureGrid.jsx';
import AIPlayground from './components/AIPlayground.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useEffect(() => {
    // Prefetch voices for TTS on first interaction
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            AI Super App Demo
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            All-in-one AI Toolkit for Learning & Creativity
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Explore a unified space with a study assistant chat, image analysis, text-to-speech, and quick translation — designed as a clean, delightful playground.
          </p>
        </section>

        <FeatureGrid />

        <AIPlayground />
      </main>

      <Footer />
    </div>
  );
}
