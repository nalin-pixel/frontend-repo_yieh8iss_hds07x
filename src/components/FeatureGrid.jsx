import { Brain, Image as ImageIcon, MessageSquare, Languages } from 'lucide-react';

export default function FeatureGrid() {
  const features = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: 'Study Assistant Chat',
      desc: 'Ask questions, summarize notes, and get step-by-step explanations.'
    },
    {
      icon: <ImageIcon className="h-5 w-5" />,
      title: 'Image Understanding',
      desc: 'Drop an image to detect objects and extract text for insights.'
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: 'Text to Speech',
      desc: 'Listen to any text with natural-sounding voices supported by your device.'
    },
    {
      icon: <Languages className="h-5 w-5" />,
      title: 'Instant Translation',
      desc: 'Translate phrases between languages using a simple interface.'
    },
  ];

  return (
    <section id="features" className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <div key={i} className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 p-2 ring-1 ring-inset ring-emerald-400/30">
              <div className="text-emerald-300">{f.icon}</div>
              <span className="text-xs font-medium text-emerald-200">AI</span>
            </div>
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-slate-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
