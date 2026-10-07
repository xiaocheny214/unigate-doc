import React, { useState } from 'react';
import { Check, Copy, ExternalLink, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { ConfigPanel, SUPPORTED_MODELS } from './ConfigPanel';

type LangType = 'curl' | 'python' | 'node';

export const QuickstartPanel: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash');
  const [activeLang, setActiveLang] = useState<LangType>('curl');
  const [viewOutput, setViewOutput] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedAgentCmd, setCopiedAgentCmd] = useState<boolean>(false);

  const snippetCurl = `curl https://unigate.top/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "${selectedModel}",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ],
    "stream": false
  }'`;

  const snippetPython = `from openai import OpenAI

client = OpenAI(
    base_url="https://unigate.top/v1",
    api_key="YOUR_API_KEY"
)

response = client.chat.completions.create(
    model="${selectedModel}",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ],
    stream=False
)

print(response.choices[0].message.content)`;

  const snippetNode = `import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://unigate.top/v1",
  apiKey: "YOUR_API_KEY"
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello!" }
    ],
    model: "${selectedModel}",
  });

  console.log(completion.choices[0].message.content);
}

main();`;

  const sampleResponse = `{
  "id": "chatcmpl-98a7cf2e94b21",
  "object": "chat.completion",
  "created": 1728312000,
  "model": "${selectedModel}",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! I am ready to assist you. How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 19,
    "completion_tokens": 16,
    "total_tokens": 35
  }
}`;

  const agentCommandText = `export ANTHROPIC_BASE_URL="https://unigate.top/v1"\nexport ANTHROPIC_AUTH_TOKEN="sk-unigate-YOUR_KEY"`;

  const activeCode =
    activeLang === 'curl' ? snippetCurl : activeLang === 'python' ? snippetPython : snippetNode;

  const handleCopyCode = async () => {
    const text = viewOutput ? sampleResponse : activeCode;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyAgentCmd = async () => {
    try {
      await navigator.clipboard.writeText(agentCommandText);
      setCopiedAgentCmd(true);
      setTimeout(() => setCopiedAgentCmd(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="not-prose my-6">
      {/* 2-Column Responsive Layout: Left Config/Guide, Right Interactive Code */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configuration Parameters & Agent Guide (7 cols on xl) */}
        <div className="xl:col-span-7 space-y-8">
          {/* 1. Connection Config Card with interactive model selection */}
          <ConfigPanel
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
          />

          {/* 2. Agent Integration Section */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                  2
                </span>
                接入 Agent 工具与命令行 (Claude Code)
              </h2>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                零改动接入
              </span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                UniGate 深度兼容 Claude Code、Cursor、GitHub Copilot 及各类 Agent。在终端使用{' '}
                <strong className="text-slate-900 font-semibold">Claude Code</strong> 时，只需在启动前设置环境变量：
              </p>

              <div className="bg-[#0b101b] rounded-xl p-4 font-mono text-xs text-slate-200 border border-slate-800/90 shadow-sm">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>~/.zshrc 或当前终端 Session</span>
                  </div>
                  <button
                    onClick={handleCopyAgentCmd}
                    type="button"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg transition-all ${
                      copiedAgentCmd
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {copiedAgentCmd ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>已复制</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>复制代码</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="space-y-1.5 text-slate-300 leading-relaxed">
                  <div>
                    <span className="text-emerald-400">export</span> ANTHROPIC_BASE_URL=
                    <span className="text-amber-300">"https://unigate.top/v1"</span>
                  </div>
                  <div>
                    <span className="text-emerald-400">export</span> ANTHROPIC_AUTH_TOKEN=
                    <span className="text-amber-300">"sk-unigate-YOUR_KEY"</span>
                  </div>
                  <div className="pt-2 text-slate-500 font-sans italic text-[11px]">
                    # 配置完成后直接在终端运行 claude 命令即可调用
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>安全提示：</strong>切勿将包含真实 API Key 的代码或脚本提交至公开 Git 仓库。本地开发推荐在 <code className="font-mono bg-amber-100/70 px-1 py-0.5 rounded text-amber-950">.env.local</code> 中存储。
                </div>
              </div>
            </div>
          </section>

          {/* 3. Steps summary / Next Steps */}
          <section className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>下一步指引</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <a
                href="https://unigate.top/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-xs transition-all block group"
              >
                <div className="font-semibold text-slate-900 group-hover:text-blue-600 flex items-center justify-between">
                  <span>1. 获取凭证</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                </div>
                <div className="text-slate-500 mt-1">在控制台生成 sk- 开头的密钥</div>
              </a>
              <div className="p-3 bg-white border border-slate-200 rounded-xl block">
                <div className="font-semibold text-slate-900">2. 测试调用</div>
                <div className="text-slate-500 mt-1">复制右侧代码在本地运行验证</div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl block">
                <div className="font-semibold text-slate-900">3. 开启流式</div>
                <div className="text-slate-500 mt-1">设置 stream: true 获取打字机体验</div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Code Console (5 cols on xl) */}
        <div className="xl:col-span-5 xl:sticky xl:top-24">
          <div className="bg-[#0b101d] rounded-2xl shadow-xl shadow-slate-900/15 border border-slate-800/90 overflow-hidden">
            {/* Top Toolbar / Tab Switcher */}
            <div className="bg-[#080d18] px-3.5 py-2.5 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
                {(
                  [
                    { id: 'curl', label: 'cURL' },
                    { id: 'python', label: 'Python' },
                    { id: 'node', label: 'Node.js' }
                  ] as { id: LangType; label: string }[]
                ).map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setActiveLang(lang.id);
                      setViewOutput(false);
                    }}
                    type="button"
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                      activeLang === lang.id && !viewOutput
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}

                <div className="w-[1px] h-3.5 bg-slate-800 mx-1"></div>

                <button
                  onClick={() => setViewOutput(!viewOutput)}
                  type="button"
                  className={`px-2 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                    viewOutput
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>响应预览</span>
                </button>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopyCode}
                type="button"
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  copiedCode
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 shadow-xs'
                }`}
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>复制</span>
                  </>
                )}
              </button>
            </div>

            {/* Context Header: Current Active Model & Endpoint */}
            <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">model:</span>
                <span className="text-blue-400 font-semibold bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/50">
                  {selectedModel}
                </span>
              </div>
              <div>
                {viewOutput ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    HTTP 200 OK
                  </span>
                ) : (
                  <span className="text-slate-400">POST /v1/chat/completions</span>
                )}
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 overflow-x-auto custom-code-scroll max-h-[500px]">
              {viewOutput ? (
                <pre className="text-xs text-emerald-300 font-mono leading-relaxed whitespace-pre selection:bg-blue-900 selection:text-white">
                  {sampleResponse}
                </pre>
              ) : (
                <pre className="text-xs text-slate-200 font-mono leading-relaxed whitespace-pre selection:bg-blue-900 selection:text-white">
                  {activeCode}
                </pre>
              )}
            </div>

            {/* Terminal Footer */}
            <div className="px-4 py-2.5 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>兼容 OpenAI SDK v1.0+</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Endpoint Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickstartPanel;
