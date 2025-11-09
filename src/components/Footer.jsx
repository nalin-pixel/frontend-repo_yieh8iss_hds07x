export default function Footer() {
  return (
    <footer id="faq" className="mt-16 border-t border-white/10 bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-slate-400">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-slate-200 font-medium">What can this demo do?</h3>
            <p className="mt-2">It showcases a study chat, a basic image analyzer, a text-to-speech reader, and a simple in-browser translator.</p>
          </div>
          <div>
            <h3 className="text-slate-200 font-medium">Will it work on mobile?</h3>
            <p className="mt-2">Yes, the layout is responsive and the text-to-speech uses your device capabilities when available.</p>
          </div>
          <div>
            <h3 className="text-slate-200 font-medium">Is this using a server?</h3>
            <p className="mt-2">This preview runs fully in your browser. A production app would connect to secure AI APIs for richer results.</p>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Aether AI. All rights reserved.</p>
          <div className="text-slate-500">Built for a fast design preview.</div>
        </div>
      </div>
    </footer>
  );
}
