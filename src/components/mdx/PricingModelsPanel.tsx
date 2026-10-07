import React from 'react';
import { Zap, Activity, Cpu, ShieldCheck } from 'lucide-react';

export const PricingModelsPanel: React.FC = () => {
  return (
    <div className="not-prose my-6 space-y-8">

      {/* Pro 套餐概览卡片 */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </span>
          <h2 className="text-lg font-bold text-slate-900">Pro 特惠套餐</h2>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div>
              <div className="text-blue-600 font-semibold text-sm mb-1">限时特惠</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">$5</span>
                <span className="text-slate-500 font-medium">/ 月</span>
                <span className="text-sm text-slate-400 line-through ml-2">原价 $8</span>
              </div>
              <p className="text-sm text-slate-600 mt-2 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-500" />
                折合单日仅约 1 元，畅享顶尖模型 API
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6 bg-white/60 p-4 rounded-xl border border-white/40 shadow-xs">
              <div className="text-center">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">日限额</div>
                <div className="text-lg font-bold text-slate-900">$40</div>
              </div>
              <div className="text-center px-4 md:px-6 border-x border-slate-200/50">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">周限额</div>
                <div className="text-lg font-bold text-slate-900">$300</div>
              </div>
              <div className="text-center">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">月限额</div>
                <div className="text-lg font-bold text-blue-700">$1299</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 模型与计费标准 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">支持的模型及计费标准</h2>
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            按 1M Tokens 计费
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          {/* 表头 - 仅在桌面端显示 */}
          <div className="hidden lg:grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200/90 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-4">模型名称</div>
            <div className="col-span-2">Input</div>
            <div className="col-span-2">Output</div>
            <div className="col-span-4">Cache (Read / Write)</div>
          </div>

          <div className="divide-y divide-slate-100">

            {/* Claude Opus 4.6 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 p-4 lg:items-center hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 lg:col-span-4 flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-orange-400 shrink-0"></div>
                <span className="font-mono text-sm font-bold text-slate-900">claude-opus-4-6</span>
              </div>
              <div className="col-span-1 lg:col-span-2 flex items-center lg:block text-sm">
                <span className="lg:hidden text-xs text-slate-500 font-medium w-16 inline-block">Input:</span>
                <span className="text-slate-700 font-medium">$5.00</span>
              </div>
              <div className="col-span-1 lg:col-span-2 flex items-center lg:block text-sm">
                <span className="lg:hidden text-xs text-slate-500 font-medium w-16 inline-block">Output:</span>
                <span className="text-slate-700 font-medium">$25.00</span>
              </div>
              <div className="col-span-1 lg:col-span-4 mt-2 lg:mt-0 flex flex-col gap-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60 font-mono w-12 text-center">Write</span>
                  <span className="text-slate-600 font-medium">$6.25 <span className="text-slate-400 font-normal">(1h $10.00)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono w-12 text-center">Read</span>
                  <span className="text-slate-600 font-medium">$0.50</span>
                </div>
              </div>
            </div>

            {/* Claude Sonnet 4.6 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 p-4 lg:items-center hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 lg:col-span-4 flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-orange-400 shrink-0"></div>
                <span className="font-mono text-sm font-bold text-slate-900">claude-sonnet-4-6</span>
              </div>
              <div className="col-span-1 lg:col-span-2 flex items-center lg:block text-sm">
                <span className="lg:hidden text-xs text-slate-500 font-medium w-16 inline-block">Input:</span>
                <span className="text-slate-700 font-medium">$3.00</span>
              </div>
              <div className="col-span-1 lg:col-span-2 flex items-center lg:block text-sm">
                <span className="lg:hidden text-xs text-slate-500 font-medium w-16 inline-block">Output:</span>
                <span className="text-slate-700 font-medium">$15.00</span>
              </div>
              <div className="col-span-1 lg:col-span-4 mt-2 lg:mt-0 flex flex-col gap-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60 font-mono w-12 text-center">Write</span>
                  <span className="text-slate-600 font-medium">$3.75 <span className="text-slate-400 font-normal">(1h $6.00)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono w-12 text-center">Read</span>
                  <span className="text-slate-600 font-medium">$0.30</span>
                </div>
              </div>
            </div>

            {/* Gemini 3.1 Pro High */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 p-4 lg:items-center hover:bg-slate-50/50 transition-colors bg-blue-50/30">
              <div className="col-span-1 lg:col-span-4 flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">gemini-3.1-pro-high</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">阶梯计费模式</div>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-2 flex flex-col gap-1.5 text-sm">
                <span className="lg:hidden text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Input</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-1 rounded w-11 text-center">≤200K</span>
                  <span className="text-slate-700 font-medium">$2.00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-1 rounded w-11 text-center">&gt;200K</span>
                  <span className="text-slate-700 font-medium">$4.00</span>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-2 flex flex-col gap-1.5 text-sm">
                <span className="lg:hidden text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5 mt-2 lg:mt-0">Output</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-1 rounded w-11 text-center">≤200K</span>
                  <span className="text-slate-700 font-medium">$12.00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-1 rounded w-11 text-center">&gt;200K</span>
                  <span className="text-slate-700 font-medium">$18.00</span>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-4 mt-2 lg:mt-0 flex flex-col gap-2.5 text-xs border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 lg:border-transparent">
                <span className="lg:hidden text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Cache</span>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">≤ 200K Context:</div>
                  <div className="flex items-center gap-2 pl-2">
                    <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60 font-mono w-10 text-center text-[10px]">Wr</span>
                    <span className="text-slate-600 font-medium">$2.00 <span className="text-slate-400 font-normal">(1h $2.00)</span></span>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono w-10 text-center text-[10px]">Rd</span>
                    <span className="text-slate-600 font-medium">$0.20</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">&gt; 200K Context:</div>
                  <div className="flex items-center gap-2 pl-2">
                    <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60 font-mono w-10 text-center text-[10px]">Wr</span>
                    <span className="text-slate-600 font-medium">$4.00 <span className="text-slate-400 font-normal">(1h $4.00)</span></span>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono w-10 text-center text-[10px]">Rd</span>
                    <span className="text-slate-600 font-medium">$0.40</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gemini 3.8 Flash High */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 p-4 lg:items-center hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 lg:col-span-4 flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                <span className="font-mono text-sm font-bold text-slate-900">gemini-3.8-flash-high</span>
              </div>
              <div className="col-span-1 lg:col-span-2 flex items-center lg:block text-sm">
                <span className="lg:hidden text-xs text-slate-500 font-medium w-16 inline-block">Input:</span>
                <span className="text-slate-700 font-medium">$0.75</span>
              </div>
              <div className="col-span-1 lg:col-span-2 flex items-center lg:block text-sm">
                <span className="lg:hidden text-xs text-slate-500 font-medium w-16 inline-block">Output:</span>
                <span className="text-slate-700 font-medium">$3.75</span>
              </div>
              <div className="col-span-1 lg:col-span-4 mt-2 lg:mt-0 flex flex-col gap-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60 font-mono w-12 text-center">Write</span>
                  <span className="text-slate-600 font-medium">$0.00 <span className="text-slate-400 font-normal">(1h $0.00)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono w-12 text-center">Read</span>
                  <span className="text-slate-600 font-medium">$0.075</span>
                </div>
              </div>
            </div>

            {/* Gemini 3.7 Flash Medium */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 p-4 lg:items-center hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 lg:col-span-4 flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                <span className="font-mono text-sm font-bold text-slate-900">gemini-3.7-flash-medium</span>
              </div>
              <div className="col-span-1 lg:col-span-2 flex items-center lg:block text-sm">
                <span className="lg:hidden text-xs text-slate-500 font-medium w-16 inline-block">Input:</span>
                <span className="text-slate-700 font-medium">$0.75</span>
              </div>
              <div className="col-span-1 lg:col-span-2 flex items-center lg:block text-sm">
                <span className="lg:hidden text-xs text-slate-500 font-medium w-16 inline-block">Output:</span>
                <span className="text-slate-700 font-medium">$3.75</span>
              </div>
              <div className="col-span-1 lg:col-span-4 mt-2 lg:mt-0 flex flex-col gap-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60 font-mono w-12 text-center">Write</span>
                  <span className="text-slate-600 font-medium">$0.00 <span className="text-slate-400 font-normal">(1h $0.00)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono w-12 text-center">Read</span>
                  <span className="text-slate-600 font-medium">$0.075</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 补充说明 */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-sm text-slate-600">
        <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-slate-800 mb-1">计费说明：</p>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>所有计费均精确到 <strong className="font-mono">1 Token</strong>，不进行向上取整。</li>
            <li>由于底层 API 提供商原因，如果模型支持 Context Caching（如 Claude 及新版 Gemini），当缓存命中时将按照上述较便宜的 Read 单价计费。</li>
            <li>调用失败（HTTP 非 200）绝不计费。</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingModelsPanel;