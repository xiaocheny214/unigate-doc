import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger';
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: { bg: 'bg-blue-950/40 border-blue-800 text-blue-200', icon: Info, iconColor: 'text-blue-400' },
  warning: { bg: 'bg-amber-950/40 border-amber-800 text-amber-200', icon: AlertTriangle, iconColor: 'text-amber-400' },
  tip: { bg: 'bg-emerald-950/40 border-emerald-800 text-emerald-200', icon: CheckCircle2, iconColor: 'text-emerald-400' },
  danger: { bg: 'bg-rose-950/40 border-rose-800 text-rose-200', icon: AlertCircle, iconColor: 'text-rose-400' }
};

export const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children }) => {
  const current = styles[type] || styles.info;
  const Icon = current.icon;

  return (
    <div className={`my-4 p-4 rounded-xl border ${current.bg} flex gap-3 text-sm leading-relaxed`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${current.iconColor}`} />
      <div className="flex-1">
        {title && <div className="font-semibold mb-1 text-slate-100">{title}</div>}
        <div className="text-slate-300">{children}</div>
      </div>
    </div>
  );
};
