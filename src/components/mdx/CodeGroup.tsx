import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeItem {
  label: string;
  code: string;
  lang?: string;
}

interface CodeGroupProps {
  items: CodeItem[];
}

export const CodeGroup: React.FC<CodeGroupProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const active = items[activeIndex] || items[0];

  const handleCopy = async () => {
    if (!active) return;
    await navigator.clipboard.writeText(active.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-3 py-2 bg-slate-950/80 border-b border-slate-800">
        <div className="flex gap-1.5 overflow-x-auto">
          {items.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                idx === activeIndex
                  ? 'bg-brand-600/30 text-brand-300 border border-brand-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          aria-label="复制代码"
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
        <code>{active?.code}</code>
      </pre>
    </div>
  );
};
