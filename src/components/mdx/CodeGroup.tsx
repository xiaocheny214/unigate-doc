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
    <div className="my-6 rounded-2xl border border-slate-200/90 bg-slate-900 text-slate-100 overflow-hidden shadow-md">
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-950 border-b border-slate-800">
        <div className="flex gap-1.5 overflow-x-auto">
          {items.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                idx === activeIndex
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          aria-label="复制代码"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4.5 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed selection:bg-blue-600 selection:text-white">
        <code>{active?.code}</code>
      </pre>
    </div>
  );
};
