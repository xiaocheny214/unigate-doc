import React, { useState } from 'react';
import {
  Terminal,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Zap,
  FileCode,
  Info,
  AlertTriangle,
  Cpu,
  Sliders
} from 'lucide-react';

type InstallTab = 'fresh' | 'migrate';
type OSType = 'posix' | 'windows';
type ModelPreset = 'flash' | 'pro' | 'sonnet';

interface PresetConfig {
  id: ModelPreset;
  name: string;
  tag: string;
  model: string;
  opusModel: string;
  sonnetModel: string;
  haikuModel: string;
  subagentModel: string;
  desc: string;
}

const PRESETS: PresetConfig[] = [
  {
    id: 'flash',
    name: 'Gemini 3.8 Flash High (极速推荐)',
    tag: '日均 1 元 · 极致吞吐',
    model: 'gemini-3.8-flash-high',
    opusModel: 'gemini-3.8-flash-high',
    sonnetModel: 'gemini-3.8-flash-high',
    haikuModel: 'gemini-3.8-flash-high',
    subagentModel: 'gemini-3.8-flash-high',
    desc: '极低延迟与极高响应速度，日常代码补全、测试排错、单文件重构性价比之王'
  },
  {
    id: 'pro',
    name: 'Gemini 3.1 Pro High (深度推理)',
    tag: '旗舰推理 · 复杂架构',
    model: 'gemini-3.1-pro-high',
    opusModel: 'gemini-3.1-pro-high',
    sonnetModel: 'gemini-3.1-pro-high',
    haikuModel: 'gemini-3.8-flash-high',
    subagentModel: 'gemini-3.8-flash-high',
    desc: '全能旗舰深度推理能力，跨几十个文件的大规模重构与算法攻坚'
  },
  {
    id: 'sonnet',
    name: 'Claude Sonnet 4.6 (原生体验)',
    tag: '经典代码架构',
    model: 'claude-sonnet-4-6',
    opusModel: 'claude-opus-4-6',
    sonnetModel: 'claude-sonnet-4-6',
    haikuModel: 'gemini-3.8-flash-high',
    subagentModel: 'gemini-3.8-flash-high',
    desc: 'Anthropic 经典高阶编程模型，遵循指令与复杂工具调度能力强劲'
  }
];

export const ClaudeCodePanel: React.FC = () => {
  const [tab, setTab] = useState<InstallTab>('fresh');
  const [os, setOs] = useState<OSType>('windows');
  const [preset, setPreset] = useState<ModelPreset>('flash');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const currentPreset = PRESETS.find((p) => p.id === preset) || PRESETS[0];

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // 生成 POSIX (Linux / macOS) 环境变量
  const posixEnvText = `export ANTHROPIC_BASE_URL="https://unigate.top/v1"
export ANTHROPIC_AUTH_TOKEN="<你的 UniGate API Key>"
export ANTHROPIC_MODEL="${currentPreset.model}"
export ANTHROPIC_DEFAULT_OPUS_MODEL="${currentPreset.opusModel}"
export ANTHROPIC_DEFAULT_SONNET_MODEL="${currentPreset.sonnetModel}"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="${currentPreset.haikuModel}"
export CLAUDE_CODE_SUBAGENT_MODEL="${currentPreset.subagentModel}"
export CLAUDE_CODE_EFFORT_LEVEL="max"
export CLAUDE_CODE_AUTO_COMPACT_WINDOW="786432"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC="1"`;

  // 生成 Windows PowerShell 环境变量
  const windowsEnvText = `$env:ANTHROPIC_BASE_URL="https://unigate.top/v1"
$env:ANTHROPIC_AUTH_TOKEN="<你的 UniGate API Key>"
$env:ANTHROPIC_MODEL="${currentPreset.model}"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="${currentPreset.opusModel}"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL="${currentPreset.sonnetModel}"
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL="${currentPreset.haikuModel}"
$env:CLAUDE_CODE_SUBAGENT_MODEL="${currentPreset.subagentModel}"
$env:CLAUDE_CODE_EFFORT_LEVEL="max"
$env:CLAUDE_CODE_AUTO_COMPACT_WINDOW="786432"
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC="1"`;

  // 生成 ~/.claude/settings.json 配置文件内容
  const settingsJsonText = `{
  "env": {
    "ANTHROPIC_BASE_URL": "https://unigate.top/v1",
    "ANTHROPIC_AUTH_TOKEN": "<你的 UniGate API Key>",
    "ANTHROPIC_MODEL": "${currentPreset.model}",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "${currentPreset.opusModel}",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "${currentPreset.sonnetModel}",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "${currentPreset.haikuModel}",
    "CLAUDE_CODE_SUBAGENT_MODEL": "${currentPreset.subagentModel}",
    "CLAUDE_CODE_EFFORT_LEVEL": "max",
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "786432",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
  }
}`;

  const activeEnvCode = os === 'windows' ? windowsEnvText : posixEnvText;

  return (
    <div className="not-prose my-6 space-y-8">
      {/* 顶部介绍与主切换栏 */}
      <section className="bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-slate-50 border border-blue-100 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                命令行 Agent 工具
              </span>
              <span className="text-xs text-slate-500 font-medium">Anthropic 官方终端助理</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              接入 Claude Code 终端编程助手
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Claude Code 是运行在终端内的 AI 编程助手，具备代码审计、全局重构、自动测试和 Git 集成能力。只需将 Base URL 指向 UniGate，即可畅享极速模型与超低使用成本。
            </p>
          </div>

          <div className="flex bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs self-start md:self-auto shrink-0">
            <button
              onClick={() => setTab('fresh')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                tab === 'fresh'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Download className="w-4 h-4" />
              从零安装配置
            </button>
            <button
              onClick={() => setTab('migrate')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                tab === 'migrate'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-4 h-4" />
              从已有安装迁移
            </button>
          </div>
        </div>
      </section>

      {/* 模型方案选择器 */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">选择推荐模型配置方案</h3>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESETS.map((p) => {
            const isSelected = preset === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setPreset(p.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/10 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-900">{p.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {p.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 视图一：从零开始安装 */}
      {tab === 'fresh' && (
        <div className="space-y-6">
          {/* 步骤流程概览 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 1</div>
              <div className="font-semibold text-slate-900 text-sm">安装 Node.js 与 CLI</div>
              <p className="text-xs text-slate-500 mt-1">安装 Node 18+ 环境并通过 npm 全局安装 @anthropic-ai/claude-code。</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 2</div>
              <div className="font-semibold text-slate-900 text-sm">配置 UniGate 环境变量</div>
              <p className="text-xs text-slate-500 mt-1">配置 Base URL 与 Token，将各级模型代理映射到 UniGate。</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 3</div>
              <div className="font-semibold text-slate-900 text-sm">进入项目并启动</div>
              <p className="text-xs text-slate-500 mt-1">在代码目录中运行 claude 命令，即刻开启 AI 协作。</p>
            </div>
          </div>

          {/* 步骤 1 详情 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-200">
                1
              </span>
              <h3 className="text-base font-bold text-slate-900">环境准备与安装 Claude Code</h3>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <p className="leading-relaxed">
                确保本地安装了 <strong>Node.js 18+</strong>。如果是 Windows 用户，建议同时安装 <strong>Git for Windows</strong>。
              </p>
              <div className="bg-slate-900 rounded-xl p-4 text-slate-100 font-mono text-xs flex items-center justify-between">
                <code>npm install -g @anthropic-ai/claude-code</code>
                <button
                  onClick={() => handleCopy('npm-install', 'npm install -g @anthropic-ai/claude-code')}
                  className="text-slate-400 hover:text-white transition p-1"
                >
                  {copiedKey === 'npm-install' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                安装结束后，在命令行执行 <code>claude --version</code>，若正确显示版本号即代表安装成功。
              </p>
            </div>
          </div>

          {/* 步骤 2 详情：配置环境变量 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-200">
                  2
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">配置接入 UniGate 环境变量</h3>
                  <p className="text-xs text-slate-500">将 Base URL 设为 https://unigate.top/v1，并填入 API Key</p>
                </div>
              </div>

              {/* 操作系统切换 */}
              <div className="flex bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
                <button
                  onClick={() => setOs('posix')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                    os === 'posix' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Linux / macOS (Bash)
                </button>
                <button
                  onClick={() => setOs('windows')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                    os === 'windows' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Windows (PowerShell)
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative bg-slate-900 rounded-xl p-4 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>{os === 'windows' ? 'PowerShell 终端执行' : 'Bash / Zsh 终端执行'}</span>
                  <button
                    onClick={() => handleCopy('fresh-env', activeEnvCode)}
                    className="flex items-center gap-1 text-slate-300 hover:text-white transition px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700"
                  >
                    {copiedKey === 'fresh-env' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[10px]">已复制</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">复制全部命令</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="leading-relaxed whitespace-pre font-mono">{activeEnvCode}</pre>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-800 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>注意替换 Key：</strong> 请将 <code>&lt;你的 UniGate API Key&gt;</code> 替换为你从 UniGate 控制台创建的真实 API Key（例如 <code>sk-unigate-xxxxxx</code>）。
                </div>
              </div>
            </div>
          </div>

          {/* 步骤 3 详情：进入项目与启动 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-200">
                3
              </span>
              <h3 className="text-base font-bold text-slate-900">进入项目目录并开始使用</h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              在终端中切换到你需要进行开发的代码仓库根目录，然后直接输入 <code>claude</code> 即可启动交互：
            </p>

            <div className="relative bg-slate-900 rounded-xl p-4 text-slate-100 font-mono text-xs flex items-center justify-between">
              <div>
                <div className="text-slate-400"># 替换为你的本地项目路径</div>
                <div>cd /path/to/my-project</div>
                <div className="text-emerald-400 font-bold mt-1">claude</div>
              </div>
              <button
                onClick={() => handleCopy('start-cmd', `cd /path/to/my-project\nclaude`)}
                className="text-slate-400 hover:text-white transition p-1 self-start"
              >
                {copiedKey === 'start-cmd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 视图二：从现有安装迁移 */}
      {tab === 'migrate' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">临时环境变量切换（当前会话生效）</h3>
                <p className="text-xs text-slate-500">如果你已经安装过 Claude Code，直接在终端中覆盖以下环境变量即可立即生效</p>
              </div>

              {/* 操作系统切换 */}
              <div className="flex bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
                <button
                  onClick={() => setOs('posix')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                    os === 'posix' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Linux / macOS
                </button>
                <button
                  onClick={() => setOs('windows')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                    os === 'windows' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Windows PowerShell
                </button>
              </div>
            </div>

            <div className="relative bg-slate-900 rounded-xl p-4 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner">
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <span>{os === 'windows' ? 'PowerShell 终端执行' : 'Bash / Zsh 终端执行'}</span>
                <button
                  onClick={() => handleCopy('migrate-env', activeEnvCode)}
                  className="flex items-center gap-1 text-slate-300 hover:text-white transition px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700"
                >
                  {copiedKey === 'migrate-env' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[10px]">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">复制全部命令</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="leading-relaxed whitespace-pre font-mono">{activeEnvCode}</pre>
            </div>

            <div className="relative bg-slate-900 rounded-xl p-4 text-slate-100 font-mono text-xs flex items-center justify-between">
              <div>
                <div className="text-slate-400"># 切换项目并直接启动</div>
                <div>cd /path/to/my-project</div>
                <div className="text-emerald-400 font-bold mt-1">claude</div>
              </div>
              <button
                onClick={() => handleCopy('start-cmd-migrate', `cd /path/to/my-project\nclaude`)}
                className="text-slate-400 hover:text-white transition p-1 self-start"
              >
                {copiedKey === 'start-cmd-migrate' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 进阶推荐：永久保存配置 ~/.claude/settings.json */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              永久配置推荐：写入 ~/.claude/settings.json
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">无需每次开终端重复输入 export</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          将配置直接写入全局用户目录下的 <code>~/.claude/settings.json</code>（Windows 为 <code>C:\Users\用户名\.claude\settings.json</code>），新打开任何终端窗口均自动生效：
        </p>

        <div className="relative bg-slate-900 rounded-xl p-4 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner">
          <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
            <span>~/.claude/settings.json</span>
            <button
              onClick={() => handleCopy('settings-json', settingsJsonText)}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700"
            >
              {copiedKey === 'settings-json' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[10px]">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px]">复制代码</span>
                </>
              )}
            </button>
          </div>
          <pre className="leading-relaxed whitespace-pre font-mono">{settingsJsonText}</pre>
        </div>
      </section>

      {/* 环境变量参数解析表 */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Info className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-bold text-slate-900">核心配置参数说明</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3 font-semibold">环境变量名称</th>
                <th className="py-2.5 px-3 font-semibold">推荐值</th>
                <th className="py-2.5 px-3 font-semibold">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-2.5 px-3 font-mono font-medium text-slate-900">ANTHROPIC_BASE_URL</td>
                <td className="py-2.5 px-3 font-mono text-blue-600">https://unigate.top/v1</td>
                <td className="py-2.5 px-3">UniGate 网关地址，兼容 Anthropic 与 OpenAI 协议规范</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-medium text-slate-900">ANTHROPIC_AUTH_TOKEN</td>
                <td className="py-2.5 px-3 font-mono text-slate-500">sk-unigate-xxxxxx</td>
                <td className="py-2.5 px-3">你的 UniGate API Key</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-medium text-slate-900">ANTHROPIC_MODEL</td>
                <td className="py-2.5 px-3 font-mono text-emerald-600">gemini-3.8-flash-high</td>
                <td className="py-2.5 px-3">默认交互与主代理调用的核心模型</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-medium text-slate-900">ANTHROPIC_DEFAULT_OPUS_MODEL</td>
                <td className="py-2.5 px-3 font-mono text-emerald-600">gemini-3.8-flash-high</td>
                <td className="py-2.5 px-3">用于映射复杂推理与架构设计层（可使用 Flash 保持极速高吞吐）</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-medium text-slate-900">CLAUDE_CODE_SUBAGENT_MODEL</td>
                <td className="py-2.5 px-3 font-mono text-emerald-600">gemini-3.8-flash-high</td>
                <td className="py-2.5 px-3">多代理子任务与并发工作流执行模型</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-medium text-slate-900">CLAUDE_CODE_EFFORT_LEVEL</td>
                <td className="py-2.5 px-3 font-mono text-slate-700">max</td>
                <td className="py-2.5 px-3">开启最高思考深度与自我修正审查，产出更高质量代码</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-medium text-slate-900">CLAUDE_CODE_AUTO_COMPACT_WINDOW</td>
                <td className="py-2.5 px-3 font-mono text-slate-700">786432</td>
                <td className="py-2.5 px-3">上下文压缩阈值（tokens），充分发挥百万人机长上下文优势</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-medium text-slate-900">CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC</td>
                <td className="py-2.5 px-3 font-mono text-slate-700">1</td>
                <td className="py-2.5 px-3">关闭非必要的后台指标收集与网络遥测，加速国内请求响应</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
