import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
};

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[#750015] text-white hover:bg-[#5d0011] shadow-lg shadow-[#750015]/20',
  outline:
    'border border-slate-300 bg-white text-slate-900 hover:border-[#750015] hover:text-[#750015]',
  ghost: 'bg-transparent text-slate-700 hover:bg-black/5',
};

export const Button = ({
  variant = 'primary',
  fullWidth,
  loading,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${fullWidth ? 'w-full' : ''} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Loading
        </span>
      ) : (
        children
      )}
    </button>
  );
};