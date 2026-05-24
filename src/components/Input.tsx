import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ label, error, icon, className = '', ...props }: InputProps) => {
  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span> : null}
      <div className="relative">
        <input
          {...props}
          className={`h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#750015] focus:ring-4 focus:ring-[#750015]/10 ${icon ? 'pr-12' : ''} ${className}`}
        />
        {icon ? <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</span> : null}
      </div>
      {error ? <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p> : null}
    </label>
  );
};