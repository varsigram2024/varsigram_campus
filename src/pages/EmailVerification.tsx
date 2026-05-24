import { useState, useRef, useEffect } from 'react';
import { Button } from '../components/Button';
import { useSignUp } from '../auth/SignUpContext';

type EmailVerificationProps = {
  onBack: () => void;
  onComplete: () => void;
};

export const EmailVerification = ({ onBack, onComplete }: EmailVerificationProps) => {
  const { signUpData, submitSignUp } = useSignUp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setTimeLeft(30);
    setOtp(['', '', '', '', '', '']);
    setTimeout(() => setIsResending(false), 1000);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      return;
    }

    setIsLoading(true);
    // Simulate verification and save user data
    await submitSignUp();
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-[520px] rounded-[2rem] bg-white px-6 py-8 shadow-xl shadow-slate-900/5 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
      <button type="button" onClick={onBack} className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200">
        ←
      </button>

      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Verify your email</h1>
      <p className="mt-3 text-sm text-slate-600">Enter the 6-digit code sent to {signUpData.email}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 rounded-lg border border-slate-300 text-center text-lg font-semibold outline-none transition focus:border-[#750015] focus:ring-4 focus:ring-[#750015]/10"
            />
          ))}
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" className="flex-1" loading={isLoading} disabled={otp.join('').length !== 6}>
            Verify
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-600">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0 || isResending}
              className="font-semibold text-[#750015] hover:underline disabled:opacity-50"
            >
              {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};
