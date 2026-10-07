import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export interface CodeItem {
  label: string;
  code: string;
  lang?: string;
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
    <div className="rounded-2xl border border-slate-800/90 bg-[#0a0f1d] text-slate-200 overflow-hidden shadow-2xl shadow-slate-950/60">
      {/* Top Header / Tab Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#070b16] border-b border-slate-800/80 gap-2">
        {/* Left Tabs (Codex, Claude Code, OpenCode...) with clean pill styling */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {items.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={item.label}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 ring-1 ring-blue-400/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isSelected
                        ? 'bg-blue-700/80 text-blue-100'
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

        {/* Right Copy Button */}
        <div className="flex items-center shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/60 transition shadow-xs active:scale-95"
            aria-label="复制代码"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>复制</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Viewer with fixed height and vertical scrollbar */}
      <div className="relative font-mono text-xs overflow-y-auto h-[360px] sm:h-[400px] bg-[#070c18] py-3.5 leading-relaxed custom-code-scroll">
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
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#050811] border-t border-slate-800/80 text-[11px] text-slate-400 font-mono gap-2">
        <div className="flex items-center gap-2.5">
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
