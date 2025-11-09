import { Rocket, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 bg-slate-950/50 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 grid place-items-center rounded-md bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-900">
            <Rocket size={18} />
          </div>
          <span className="font-semibold tracking-tight">Aether AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#playground" className="hover:text-white transition">Playground</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </nav>
        <button className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/20 hover:bg-white/20 transition">
          <Settings size={16} />
          Settings
        </button>
      </div>
    </header>
  );
}
