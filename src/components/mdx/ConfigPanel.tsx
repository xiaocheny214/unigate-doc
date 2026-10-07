import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Eye, EyeOff } from 'lucide-react';

export interface ModelOption {
  id: string;
  name: string;
  tag: string;
  badge?: string;
  provider: string;
  desc: string;
}

export const SUPPORTED_MODELS: ModelOption[] = [
  {
    id: 'gemini-3.1-pro',
    name: 'Gemini 3.1 Pro',
    tag: '深度推理',
    provider: 'Google',
    desc: '兼顾成本与全能推理的旗舰选择'
  },
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    tag: '通用生产',
    provider: 'Google',
    desc: '超高吞吐、极低延迟，最适合高频交互与测试'
  },
  {
    id: 'claude-sonnet-4-6',
    name: 'Claude Sonnet 4.6',
    tag: '推荐测试',
    badge: '额度小',
    provider: 'Anthropic',
    desc: '强大的编程、架构与工具调用能力'
  },
  {
    id: 'claude-opus-4-6',
    name: 'Claude Opus 4.6',
    tag: '推荐测试',
    badge: '额度小',
    provider: 'Anthropic',
    desc: '复杂逻辑解构与长上下文终极理解'
  }
];

export interface ConfigPanelProps {
  selectedModel?: string;
  onSelectModel?: (modelId: string) => void;
  className?: string;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  selectedModel: controlledModel,
  onSelectModel,
  className = ''
}) => {
  const [internalModel, setInternalModel] = useState<string>('gemini-3.8-flash');
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [showMaskedKey, setShowMaskedKey] = useState<boolean>(true);

  const activeModel = controlledModel ?? internalModel;

  const handleSelectModel = (id: string) => {
    if (onSelectModel) {
      onSelectModel(id);
    } else {
      setInternalModel(id);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText('https://unigate.top/v1');
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 1800);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className={`not-prose ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
            1
          </span>
          网关连接参数 (Configuration)
        </h2>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
          OpenAI & Anthropic Compatible
        </span>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs divide-y divide-slate-100 overflow-hidden">
        {/* Row 1: Base URL */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                BASE_URL
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                全协议统一
              </span>
            </div>
            <div className="mt-1.5 font-mono text-sm font-semibold text-slate-900 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70 inline-block">
              https://unigate.top/v1
            </div>
            <p className="text-xs text-slate-500 mt-1">
              OpenAI 与 Anthropic 协议均统一使用此入口
            </p>
          </div>

          <button
            onClick={handleCopyUrl}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 self-start sm:self-center ${
              copiedUrl
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-2xs hover:bg-slate-50'
            }`}
          >
            {copiedUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>已复制 URL</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>复制 URL</span>
              </>
            )}
          </button>
        </div>

        {/* Row 2: API Key */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                API_KEY
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/70">
                必须保密
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
              <code className="font-mono text-sm font-medium text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70 select-all">
                {showMaskedKey ? 'sk-unigate-••••••••••••••••' : 'sk-unigate-d8f92a10b4c'}
              </code>
              <button
                type="button"
                onClick={() => setShowMaskedKey(!showMaskedKey)}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 rounded hover:bg-slate-100 transition"
              >
                {showMaskedKey ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>显示</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    <span>隐藏</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              调用时放入请求头 <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">Authorization: Bearer YOUR_KEY</code>
            </p>
          </div>

          <div className="shrink-0 self-start sm:self-center">
            <a
              href="https://unigate.top/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/80 transition-colors shadow-2xs"
            >
              <span>创建 API Key</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Row 3: Supported Models */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                SUPPORTED_MODELS
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline-block">
                点击选中实时同步右侧代码
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
            {SUPPORTED_MODELS.map((m) => {
              const isSelected = activeModel === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => handleSelectModel(m.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-xs font-bold text-slate-900">{m.id}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {m.tag}
                      </span>
                      {m.badge && (
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-amber-400 text-amber-950 font-semibold'
                              : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                          }`}
                        >
                          {m.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{m.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pt-2.5 border-t border-slate-100 gap-2">
            <span>
              💡 推荐使用 <strong className="text-slate-800 font-mono">gemini-3.8-flash</strong> 作为测试基准模型
            </span>
            <a
              href="/docs/pricing-models"
              className="text-blue-600 hover:text-blue-700 hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>查看完整费率与支持矩阵</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfigPanel;
