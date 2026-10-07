import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export interface CodeItem {
  label: string;
  code: string;
  lang?: string;
  sublabel?: string;
  badge?: string;
  highlightLines?: number[];
  footerNote?: string;
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

  const lines = active?.code ? active.code.split('\n') : [];
  const lineCount = lines.length;
  const highlightSet = new Set(active?.highlightLines || []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0c121e] text-slate-200 overflow-hidden shadow-2xl shadow-slate-900/40">
      {/* Top Header / Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-[#080d18] border-b border-slate-800/80 gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {items.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={item.label}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600/90 text-white shadow-sm shadow-blue-500/20 border border-blue-400/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                      isSelected
                        ? 'bg-blue-800/80 text-blue-100'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400">
          {active?.sublabel && (
            <span className="text-[11px] font-mono text-slate-400 truncate max-w-xs sm:max-w-md">
              {active.sublabel}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors shadow-xs"
            aria-label="复制代码"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>复制</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Viewer with Line Numbers & Highlights */}
      <div className="relative font-mono text-xs overflow-x-auto bg-[#0a0f1d] py-3 leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((lineText, idx) => {
              const lineNum = idx + 1;
              const isHighlighted = highlightSet.has(lineNum);
              return (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isHighlighted
                      ? 'bg-blue-500/15 border-l-2 border-blue-400'
                      : 'hover:bg-slate-800/30 border-l-2 border-transparent'
                  }`}
                >
                  <td className="w-12 select-none text-right pr-4 pl-3 py-0.5 text-slate-600 font-mono text-[11px] align-top">
                    {lineNum}
                  </td>
                  <td className="pr-4 py-0.5 whitespace-pre font-mono text-slate-200">
                    <span
                      className={
                        isHighlighted
                          ? 'text-white font-medium'
                          : lineText.trim().startsWith('#') || lineText.trim().startsWith('//')
                          ? 'text-slate-500 italic'
                          : lineText.trim().startsWith('$')
                          ? 'text-emerald-400 font-semibold'
                          : lineText.trim().startsWith('✓')
                          ? 'text-emerald-400'
                          : 'text-slate-200'
                      }
                    >
                      {lineText}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info / Stats Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#060a12] border-t border-slate-800/70 text-[11px] text-slate-400 font-mono gap-2">
        <div className="flex items-center gap-3">
          <span className="text-slate-400">{lineCount} 行</span>
          {highlightSet.size > 0 && (
            <>
              <span className="text-slate-700">·</span>
              <span className="text-blue-400">已高亮 {highlightSet.size} 行</span>
            </>
          )}
          {active?.lang && (
            <>
              <span className="text-slate-700">·</span>
              <span className="uppercase text-slate-400">{active.lang}</span>
            </>
          )}
        </div>
        {active?.footerNote && (
          <div className="text-slate-400 text-[11px] font-sans flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            <span>{active.footerNote}</span>
          </div>
        )}
      </div>
    </div>
  );
};
