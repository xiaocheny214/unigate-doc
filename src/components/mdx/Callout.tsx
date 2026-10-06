import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger';
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: { bg: 'bg-blue-50/80 border-blue-200 text-blue-900', icon: Info, iconColor: 'text-blue-600' },
  warning: { bg: 'bg-amber-50/80 border-amber-200 text-amber-900', icon: AlertTriangle, iconColor: 'text-amber-600' },
  tip: { bg: 'bg-emerald-50/80 border-emerald-200 text-emerald-900', icon: CheckCircle2, iconColor: 'text-emerald-600' },
  danger: { bg: 'bg-rose-50/80 border-rose-200 text-rose-900', icon: AlertCircle, iconColor: 'text-rose-600' }
};

export const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children }) => {
  const current = styles[type] || styles.info;
  const Icon = current.icon;

  return (
    <div className={`my-5 p-4 rounded-xl border ${current.bg} flex gap-3.5 text-sm leading-relaxed shadow-xs`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${current.iconColor}`} />
      <div className="flex-1">
        {title && <div className="font-semibold mb-1 text-slate-900">{title}</div>}
        <div className="text-slate-700">{children}</div>
      </div>
    </div>
  );
};
