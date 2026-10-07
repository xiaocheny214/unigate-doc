import React, { useState } from 'react';
import {
  AppWindow,
  FileCode,
  Check,
  Copy,
  ExternalLink,
  AlertTriangle,
  Terminal,
  HelpCircle,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';

type ConfigMode = 'deskui' | 'models_json';
type ShellType = 'powershell' | 'bash';

interface WorkbuddyModelOption {
  id: string;
  name: string;
  tag: string;
  badge?: string;
  provider: string;
  desc: string;
}

const WORKBUDDY_MODELS: WorkbuddyModelOption[] = [
  {
    id: 'gemini-3.8-flash-high',
    name: 'Gemini 3.8 Flash High',
    tag: '极速高吞吐',
    provider: 'Google',
    desc: '极低延迟、极高吞吐，WorkBuddy 日常高频补全与交互首选'
  },
  {
    id: 'gemini-3.1-pro-high',
    name: 'Gemini 3.1 Pro High',
    tag: '深度推理',
    provider: 'Google',
    desc: '全能旗舰推理能力，适合复杂多文件重构与架构分析'
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

export const WorkbuddyPanel: React.FC = () => {
  const [mode, setMode] = useState<ConfigMode>('deskui');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash-high');
  const [inputTokenPreset, setInputTokenPreset] = useState<string>('128k');
  const [outputTokenPreset, setOutputTokenPreset] = useState<string>('16k');
  const [activeShell, setActiveShell] = useState<ShellType>('powershell');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getNumericTokens = (preset: string) => {
    switch (preset) {
      case '32k':
        return 32000;
      case '64k':
        return 64000;
      case '128k':
        return 128000;
      case '256k':
        return 256000;
      case '8k':
        return 8192;
      case '16k':
        return 16384;
      case '32k_out':
        return 32000;
      case '64k_out':
        return 64000;
      default:
        return 128000;
    }
  };

  const currentModelObj = WORKBUDDY_MODELS.find((m) => m.id === selectedModel) || WORKBUDDY_MODELS[0];

  const modelsJsonContent = `{
  "models": [
    {
      "id": "${selectedModel}",
      "name": "${currentModelObj.name} (UniGate)",
      "vendor": "UniGate",
      "url": "https://unigate.top/v1/chat/completions",
      "apiKey": "\${UNIGATE_API_KEY}",
      "maxInputTokens": ${getNumericTokens(inputTokenPreset)},
      "maxOutputTokens": ${getNumericTokens(outputTokenPreset)},
      "supportsToolCall": true,
      "supportsImages": true
    }
  ],
  "availableModels": [
    "${selectedModel}"
  ]
}`;

  const psVerification = `$env:UNIGATE_API_KEY="YOUR_API_KEY"

curl https://unigate.top/v1/chat/completions \`
  -H "Content-Type: application/json" \`
  -H "Authorization: Bearer $env:UNIGATE_API_KEY" \`
  -d '{"model":"${selectedModel}","messages":[{"role":"user","content":"hi"}],"stream":false}'`;

  const bashVerification = `export UNIGATE_API_KEY="YOUR_API_KEY"

curl https://unigate.top/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $UNIGATE_API_KEY" \\
  -d '{
    "model": "${selectedModel}",
    "messages": [{"role": "user", "content": "hi"}],
    "stream": false
  }'`;

  return (
    <div className="not-prose my-6 space-y-8">
      {/* 顶部介绍与切换条 */}
      <section className="bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-slate-50 border border-blue-100 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                Agent 客户端接入
              </span>
              <span className="text-xs text-slate-500 font-medium">支持 WorkBuddy / CodeBuddy</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              快速接入 WorkBuddy / CodeBuddy 编程助手
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              WorkBuddy / CodeBuddy 是专业的 AI 编程与 Agent 助手。UniGate 提供完全兼容 OpenAI 协议的接口标准，支持在图形界面或配置文件中添加自定义模型。
            </p>
          </div>

          <div className="flex bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs self-start md:self-auto shrink-0">
            <button
              onClick={() => setMode('deskui')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'deskui'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <AppWindow className="w-4 h-4" />
              图形界面配置 (推荐)
            </button>
            <button
              onClick={() => setMode('models_json')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'models_json'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileCode className="w-4 h-4" />
              配置文件 (models.json)
            </button>
          </div>
        </div>
      </section>

      {/* 模式一：图形界面 DeskUI 配置 */}
      {mode === 'deskui' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-200">
                1
              </span>
              图形界面操作指南
            </h3>
            <span className="text-xs text-slate-500 font-medium">无需修改代码，开箱即用</span>
          </div>

          {/* 步骤条 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs relative">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 1</div>
              <div className="font-semibold text-slate-900 text-sm">打开设置</div>
              <p className="text-xs text-slate-500 mt-1">进入 WorkBuddy 侧边栏或主界面的系统设置面板。</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs relative">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 2</div>
              <div className="font-semibold text-slate-900 text-sm">模型管理</div>
              <p className="text-xs text-slate-500 mt-1">在左侧菜单中找到「模型」详情页面。</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs relative">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 3</div>
              <div className="font-semibold text-slate-900 text-sm">自定义模型</div>
              <p className="text-xs text-slate-500 mt-1">在「自定义模型」一栏中，点击右侧「添加模型」按钮。</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs relative">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 4</div>
              <div className="font-semibold text-slate-900 text-sm">填写参数保存</div>
              <p className="text-xs text-slate-500 mt-1">选择自定义供应商，填入下方对应的各项参数即可完成。</p>
            </div>
          </div>

          {/* 表单填写对照清单 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">添加模型详情参数填写对照表</h4>
                <p className="text-xs text-slate-500 mt-0.5">请将以下参数对应填入 WorkBuddy 的添加模型弹窗中</p>
              </div>
              <a
                href="https://unigate.top/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                获取 UniGate API Key <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 供应商 */}
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>供应商 (Vendor)</span>
                  <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">关键步骤</span>
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  向下滑动并选择 <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-200">自定义</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  注意：请在下拉列表中滑动到最下方找到「自定义」，不要误选其它固定供应商。
                </p>
              </div>

              {/* 接口地址 */}
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>接口地址 (URL)</span>
                  <button
                    onClick={() => handleCopy('url', 'https://unigate.top/v1/chat/completions')}
                    className="text-[11px] text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                  >
                    {copiedKey === 'url' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === 'url' ? '已复制' : '复制'}
                  </button>
                </div>
                <div className="font-mono text-xs font-semibold text-slate-900 bg-white p-2 rounded border border-slate-200/80 break-all select-all">
                  https://unigate.top/v1/chat/completions
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  WorkBuddy 自定义模型要求填写完整的聊天补全端点地址。
                </p>
              </div>

              {/* API Key */}
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  API Key
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  填入您的 UniGate 访问令牌 (如 <code className="text-xs font-mono bg-white px-1.5 py-0.5 rounded border">sk-...</code>)
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  请确保填入真实的 UniGate 密钥，千万不要将接口 URL 误填至此。
                </p>
              </div>

              {/* 模型名称 */}
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>模型名称 (Model)</span>
                  <button
                    onClick={() => handleCopy('model', selectedModel)}
                    className="text-[11px] text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                  >
                    {copiedKey === 'model' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === 'model' ? '已复制' : '复制所选'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {WORKBUDDY_MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m.id)}
                      className={`text-xs px-2.5 py-1 rounded font-mono font-medium transition-colors ${
                        selectedModel === m.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {m.id}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  当前选中：<span className="font-semibold text-slate-800">{currentModelObj.name}</span> - {currentModelObj.desc}
                </p>
              </div>

              {/* 上下文输入限制 */}
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  最大输入 (Input Tokens)
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {['32k', '64k', '128k', '256k'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setInputTokenPreset(val)}
                      className={`text-xs px-3 py-1 rounded font-medium transition-colors ${
                        inputTokenPreset === val
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  支持 32k / 64k / 128k / 256k。推荐 128k 或 256k，支撑大型项目代码索引与超长多文件检索。
                </p>
              </div>

              {/* 最大输出限制 */}
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  最大输出 (Output Tokens)
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { label: '8k', key: '8k' },
                    { label: '16k', key: '16k' },
                    { label: '32k', key: '32k_out' },
                    { label: '64k', key: '64k_out' }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setOutputTokenPreset(item.key)}
                      className={`text-xs px-3 py-1 rounded font-medium transition-colors ${
                        outputTokenPreset === item.key
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  支持 8k / 16k / 32k / 64k。推荐 16k 以上，保证生成超长单文件与完整工程代码不截断。
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 模式二：配置文件 (models.json) 配置 */}
      {mode === 'models_json' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-200">
                1
              </span>
              本地配置文件路径
            </h3>
            <span className="text-xs text-slate-500 font-medium">适合批量分发与团队统一环境配置</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>用户级配置 (全局生效)</span>
                <span className="text-xs text-blue-600 font-normal">默认首选</span>
              </div>
              <div className="bg-slate-900 text-slate-200 p-2.5 rounded-lg text-xs font-mono break-all mt-2 select-all">
                C:\Users\&lt;你的用户名&gt;\.codebuddy\models.json
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Mac/Linux 路径为：<code className="text-[11px] font-mono bg-slate-100 px-1 py-0.5 rounded">~/.codebuddy/models.json</code>
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>项目级配置 (仅当前工程生效)</span>
                <span className="text-xs text-slate-400 font-normal">可选隔离</span>
              </div>
              <div className="bg-slate-900 text-slate-200 p-2.5 rounded-lg text-xs font-mono break-all mt-2 select-all">
                &lt;你的项目根目录&gt;\.codebuddy\models.json
              </div>
              <p className="text-xs text-slate-500 mt-2">
                如果只想为特定代码仓库启用 UniGate，可在该项目根目录下新建该文件。
              </p>
            </div>
          </div>

          {/* 交互式生成 JSON 配置 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50/70 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-700">选择要写入的模型配置：</span>
                <div className="flex flex-wrap gap-1">
                  {WORKBUDDY_MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m.id)}
                      className={`text-xs px-2 py-0.5 rounded font-mono transition-colors ${
                        selectedModel === m.id
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m.id}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleCopy('models_json', modelsJsonContent)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs"
              >
                {copiedKey === 'models_json' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>已复制配置</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>复制 JSON</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed m-0">
                {modelsJsonContent}
              </pre>
            </div>

            {/* UTF-8 无 BOM 提示 */}
            <div className="p-4 bg-amber-50/90 border-t border-amber-200/80 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">特别注意：</span>请务必将 <code className="bg-amber-100 px-1 py-0.5 rounded font-semibold">models.json</code> 保存为 <strong>UTF-8 无 BOM</strong> 格式。部分桌面版本在读取包含 UTF-8 BOM 文件头的 JSON 时，可能导致解析失败。
              </div>
            </div>
          </div>

          {/* 环境变量设置提示 */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                推荐：将 API Key 设定为系统环境变量 (Windows setx)
              </span>
              <button
                onClick={() => handleCopy('setx', 'setx UNIGATE_API_KEY "YOUR_API_KEY"')}
                className="text-[11px] text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                {copiedKey === 'setx' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedKey === 'setx' ? '已复制' : '复制命令'}
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-100 p-2.5 rounded-lg text-xs font-mono overflow-x-auto m-0">
              setx UNIGATE_API_KEY "你的_UniGate_API_Key"
            </pre>
            <p className="text-[11px] text-slate-500 mt-2">
              注：设置环境变量后，需重新启动 WorkBuddy 客户端生效；或者您也可以直接在 JSON 文件中用实际 API Key 替换 <code className="font-mono">${'{UNIGATE_API_KEY}'}</code>。
            </p>
          </div>
        </section>
      )}

      {/* 步骤 2：重启与选择模型 */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-200">
            2
          </span>
          重启客户端并在对话中切换模型
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          完成配置后，请<strong>完全退出并重新启动 WorkBuddy / CodeBuddy</strong>（避免后台热缓存未刷新）。打开项目后，在聊天输入框底部的<strong>模型选择器</strong>中，即可看到并选择刚刚添加的自定义模型（如 <code className="text-xs font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">{selectedModel}</code>）。
        </p>
      </section>

      {/* 步骤 3：连通性验证 */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-200">
                3
              </span>
              可选：在终端中验证 API 连通性
            </h3>
            <p className="text-xs text-slate-500 mt-1">若遇到客户端无法应答，可在命令行直接测试 UniGate 接口连通状态</p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveShell('powershell')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeShell === 'powershell'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PowerShell
            </button>
            <button
              onClick={() => setActiveShell('bash')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeShell === 'bash'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bash / macOS
            </button>
          </div>
        </div>

        <div className="relative">
          <pre className="p-4 bg-slate-950 text-slate-200 text-xs font-mono rounded-xl overflow-x-auto leading-relaxed m-0">
            {activeShell === 'powershell' ? psVerification : bashVerification}
          </pre>
          <button
            onClick={() =>
              handleCopy('verify_curl', activeShell === 'powershell' ? psVerification : bashVerification)
            }
            className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition"
          >
            {copiedKey === 'verify_curl' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedKey === 'verify_curl' ? '已复制' : '复制命令'}
          </button>
        </div>
      </section>

      {/* 常见问题排查 FAQ */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          常见问题与排错指南
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-xs font-bold text-red-600 flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Authentication Fails 或 401 报错
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              请检查 API Key 是否为有效的 UniGate Key。<strong>不要将接口 URL 填到 API Key 字段</strong>。如果使用了环境变量，确认是否已执行保存并重启了应用。
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-xs font-bold text-orange-600 flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              未找到模型 或 404 错误
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              请检查填写的模型名称是否准确对应 UniGate 支持的模型 ID（如 <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">gemini-3.8-flash-high</code>、<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">gemini-3.1-pro-high</code>、<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">claude-sonnet-4-6</code> 等）。
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-xs font-bold text-amber-600 flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              读取本地模型配置失败
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              检查 <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">models.json</code> 是否为合法的 JSON 格式，注意末尾不要有多余逗号，并且必须保存为 <strong>UTF-8 无 BOM</strong> 编码。
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-xs font-bold text-blue-600 flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              UI 中直接显示 ${'{UNIGATE_API_KEY}'}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              部分 Windows 客户端在未从终端传递环境变量时可能不自动展开变量。如遇此情况，可直接在图形设置界面或 <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">models.json</code> 中填入真实的 API Key 明文。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
