import React from 'react';
import { AlertCircle, Ban, CircleDollarSign, Fingerprint, ServerCrash, Timer, ZapOff, ExternalLink } from 'lucide-react';

export const ErrorCodesPanel: React.FC = () => {
  return (
    <div className="not-prose my-6 space-y-8">

      {/* 概览说明 */}
      <section>
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 shadow-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-amber-900 text-sm leading-relaxed">
            您在调用 UniGate API 时，可能会遇到以下错误。这里列出了相关错误的原因及其解决方法。由于我们严格兼容 OpenAI/Anthropic 协议，报错结构也与其保持一致。
          </div>
        </div>
      </section>

      {/* 错误码列表 */}
      <section>
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          {/* 表头 - 仅在桌面端显示 */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200/90 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-3">错误状态码</div>
            <div className="col-span-4">原因</div>
            <div className="col-span-5">解决方法</div>
          </div>

          <div className="divide-y divide-slate-100">

            {/* 400 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 hover:bg-slate-50/50 transition-colors group">
              <div className="col-span-1 md:col-span-3 flex items-start md:items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200/60 group-hover:bg-orange-100 transition-colors">
                  <Ban className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">400</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">格式错误</div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">原因</span>
                <span className="text-slate-700">请求体格式错误</span>
              </div>
              <div className="col-span-1 md:col-span-5 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 mt-2">解决方法</span>
                <span className="text-emerald-700 bg-emerald-50/50 px-2.5 py-1.5 rounded-lg border border-emerald-100/50">请根据错误信息提示修改请求体。</span>
              </div>
            </div>

            {/* 401 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 hover:bg-slate-50/50 transition-colors group">
              <div className="col-span-1 md:col-span-3 flex items-start md:items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200/60 group-hover:bg-red-100 transition-colors">
                  <Fingerprint className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">401</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">认证失败</div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">原因</span>
                <span className="text-slate-700">API Key 错误或未提供，认证失败</span>
              </div>
              <div className="col-span-1 md:col-span-5 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 mt-2">解决方法</span>
                <span className="text-emerald-700 bg-emerald-50/50 px-2.5 py-1.5 rounded-lg border border-emerald-100/50 block">
                  请检查您的 API Key 是否正确。如没有，请先 <a href="https://unigate.top/keys" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-blue-600 hover:text-blue-700 hover:underline font-semibold">创建 API Key <ExternalLink className="w-3 h-3" /></a>。
                </span>
              </div>
            </div>

            {/* 402 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 hover:bg-slate-50/50 transition-colors group">
              <div className="col-span-1 md:col-span-3 flex items-start md:items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60 group-hover:bg-blue-100 transition-colors">
                  <CircleDollarSign className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">402</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">余额不足</div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">原因</span>
                <span className="text-slate-700">账号余额不足或触及套餐限额</span>
              </div>
              <div className="col-span-1 md:col-span-5 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 mt-2">解决方法</span>
                <span className="text-emerald-700 bg-emerald-50/50 px-2.5 py-1.5 rounded-lg border border-emerald-100/50 block">
                  请确认账户余额，并前往 <a href="https://unigate.top/purchase" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-blue-600 hover:text-blue-700 hover:underline font-semibold">充值 <ExternalLink className="w-3 h-3" /></a> 页面进行充值。
                </span>
              </div>
            </div>

            {/* 422 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 hover:bg-slate-50/50 transition-colors group">
              <div className="col-span-1 md:col-span-3 flex items-start md:items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/60 group-hover:bg-amber-100 transition-colors">
                  <ZapOff className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">422</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">参数错误</div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">原因</span>
                <span className="text-slate-700">请求体参数错误（如缺失必填字段等）</span>
              </div>
              <div className="col-span-1 md:col-span-5 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 mt-2">解决方法</span>
                <span className="text-emerald-700 bg-emerald-50/50 px-2.5 py-1.5 rounded-lg border border-emerald-100/50">
                  请根据错误信息提示修改相关参数。
                </span>
              </div>
            </div>

            {/* 429 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 hover:bg-slate-50/50 transition-colors group">
              <div className="col-span-1 md:col-span-3 flex items-start md:items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200/60 group-hover:bg-purple-100 transition-colors">
                  <Timer className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">429</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">请求速率达到上限</div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">原因</span>
                <span className="text-slate-700">请求并发或速率（TPM 或 RPM）达到上限</span>
              </div>
              <div className="col-span-1 md:col-span-5 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 mt-2">解决方法</span>
                <span className="text-emerald-700 bg-emerald-50/50 px-2.5 py-1.5 rounded-lg border border-emerald-100/50">
                  请合理规划您的请求速率。
                </span>
              </div>
            </div>

            {/* 500 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 hover:bg-slate-50/50 transition-colors group">
              <div className="col-span-1 md:col-span-3 flex items-start md:items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/80 group-hover:bg-slate-200 transition-colors">
                  <ServerCrash className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">500</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">服务器故障</div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">原因</span>
                <span className="text-slate-700">服务器内部故障</span>
              </div>
              <div className="col-span-1 md:col-span-5 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 mt-2">解决方法</span>
                <span className="text-emerald-700 bg-emerald-50/50 px-2.5 py-1.5 rounded-lg border border-emerald-100/50">
                  请等待后重试。若问题一直存在，请联系我们解决。
                </span>
              </div>
            </div>

            {/* 503 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 hover:bg-slate-50/50 transition-colors group">
              <div className="col-span-1 md:col-span-3 flex items-start md:items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/80 group-hover:bg-slate-200 transition-colors">
                  <ServerCrash className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">503</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">服务器繁忙</div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">原因</span>
                <span className="text-slate-700">服务器负载过高</span>
              </div>
              <div className="col-span-1 md:col-span-5 flex flex-col justify-center text-sm">
                <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 mt-2">解决方法</span>
                <span className="text-emerald-700 bg-emerald-50/50 px-2.5 py-1.5 rounded-lg border border-emerald-100/50">
                  请稍后重试您的请求。
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorCodesPanel;