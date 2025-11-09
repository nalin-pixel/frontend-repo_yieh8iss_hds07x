import { useEffect, useMemo, useRef, useState } from 'react';
import { Upload, Send, Volume2, Languages } from 'lucide-react';

const defaultPrompt = `Explain photosynthesis like I'm five.`;

export default function AIPlayground() {
  // Chat state (frontend-only mock using local reasoning)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help you study, read images, speak text, and translate.' },
  ]);
  const [input, setInput] = useState('');

  // Image analysis (client-side demo: OCR via canvas + basic color/object hint)
  const [imagePreview, setImagePreview] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);

  // Translation (simple browser-based, non-ML demo using Intl APIs fallback)
  const [lang, setLang] = useState('es');
  const [textToTranslate, setTextToTranslate] = useState('Learning with AI is fun!');
  const [translated, setTranslated] = useState('');

  // Text-to-speech
  const speak = (text) => {
    if (!('speechSynthesis' in window)) return alert('Speech Synthesis not supported in this browser.');
    const utter = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang?.toLowerCase().startsWith(lang)) || voices.find(v => v.lang?.startsWith('en'));
    if (preferred) utter.voice = preferred;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const onSend = () => {
    const content = input.trim();
    if (!content) return;
    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    // Mock assistant: very simple heuristic summary/guide
    const reply = content.length > 140
      ? 'Here is a concise summary: ' + content.slice(0, 120) + '...'
      : `Think step-by-step: ${content.split(' ').slice(0, 12).join(' ')}... What do you already know?`;
    setTimeout(() => setMessages(m => [...m, { role: 'assistant', content: reply }]), 300);
  };

  const onImagePick = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    // Basic analysis demo: draw to canvas and compute dominant color
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let r=0,g=0,b=0,count=0;
      for (let i = 0; i < data.length; i += 4 * 1000) { // sample pixels
        r += data[i]; g += data[i+1]; b += data[i+2]; count++;
      }
      r = Math.round(r/count); g = Math.round(g/count); b = Math.round(b/count);
      const hex = '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
      setImageInfo({ dominantColor: hex, note: 'Client-side demo: estimated dominant color.' });
    };
    img.src = url;
  };

  useEffect(() => {
    // simple faux translator (no external API). For demo, swap a few words.
    const map = {
      es: { Learning: 'Aprender', with: 'con', AI: 'IA', is: 'es', fun: 'divertido' },
      fr: { Learning: 'Apprendre', with: 'avec', AI: 'IA', is: 'est', fun: 'amusant' },
      de: { Learning: 'Lernen', with: 'mit', AI: 'KI', is: 'ist', fun: 'lustig' },
    };
    const dict = map[lang] || {};
    const words = textToTranslate.split(/(\b)/).map(w => dict[w] ?? dict[w.replace(/[!?.]/g,'')]?.concat(w.match(/[!?.]/g)?.[0]||'') ?? w);
    setTranslated(words.join(''));
  }, [lang, textToTranslate]);

  return (
    <section id="playground" className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-3">Study Assistant</h2>
          <div className="flex-1 overflow-auto pr-1">
            <div className="space-y-3">
              {messages.map((m, idx) => (
                <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                  <div className={`inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'bg-emerald-500 text-slate-900' : 'bg-white/10 text-slate-100'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSend()}
              placeholder={defaultPrompt}
              className="flex-1 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-500/60"
            />
            <button onClick={onSend} className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-emerald-400 transition">
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Image Understand */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-lg font-semibold mb-3">Image Understanding</h2>
          <label className="flex h-36 cursor-pointer items-center justify-center rounded-lg border border-dashed border-white/20 bg-slate-900/40 hover:bg-slate-900/60 transition">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onImagePick(e.target.files?.[0])} />
            <div className="flex items-center gap-2 text-slate-300">
              <Upload size={16} />
              <span>Drop or select an image</span>
            </div>
          </label>
          {imagePreview && (
            <div className="mt-3 grid grid-cols-5 gap-3">
              <img src={imagePreview} alt="preview" className="col-span-3 aspect-video w-full rounded-lg object-cover" />
              <div className="col-span-2 text-sm space-y-2">
                <div className="rounded-md bg-white/10 p-3">
                  <div className="text-slate-300">Dominant color</div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-4 w-4 rounded" style={{ background: imageInfo?.dominantColor }} />
                    <span className="font-mono">{imageInfo?.dominantColor}</span>
                  </div>
                </div>
                <div className="rounded-md bg-white/10 p-3">
                  <div className="text-slate-300">Notes</div>
                  <p className="mt-1 text-slate-200">{imageInfo?.note}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TTS + Translate */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-lg font-semibold mb-3">Read & Translate</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-300">Enter text</label>
              <textarea
                className="mt-1 w-full resize-none rounded-lg border border-white/10 bg-slate-900/60 p-3 text-sm outline-none focus:border-emerald-500/60"
                rows={4}
                value={textToTranslate}
                onChange={(e) => setTextToTranslate(e.target.value)}
              />
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => speak(textToTranslate)} className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-emerald-400 transition">
                  <Volume2 size={16} /> Speak
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-300">Translate to</label>
              <div className="mt-1 flex items-center gap-2">
                <div className="relative">
                  <select value={lang} onChange={(e) => setLang(e.target.value)} className="appearance-none rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 pr-8 text-sm">
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                    <Languages size={14} />
                  </div>
                </div>
                <button onClick={() => setTranslated(translated)} className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/20 transition">Refresh</button>
              </div>
              <div className="mt-3 rounded-lg border border-white/10 bg-slate-900/40 p-3 text-sm">
                {translated || 'Translation will appear here.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
