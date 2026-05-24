import { FormEvent, useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Logo } from '../components/Logo';

type LoginProps = {
  onBackToWelcome: () => void;
  onSignUp: () => void;
  onLoginSuccess: () => void;
};

export const Login = ({ onBackToWelcome, onSignUp, onLoginSuccess }: LoginProps) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const saved = window.localStorage.getItem('varsigram-campus-user');
    const user = saved ? JSON.parse(saved) as { email?: string; password?: string } : null;

    if (user?.email === formData.email && user?.password === formData.password) {
      window.sessionStorage.setItem('varsigram-campus-session', JSON.stringify({ email: formData.email }));
      setError('');
      setIsLoading(false);
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Please sign up first or check your details.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f2f3] text-slate-900 lg:flex">
      <div className="hidden lg:flex lg:w-[44%] flex-col justify-between bg-gradient-to-br from-[#29000c] via-[#750015] to-[#ab243d] p-10 text-white">
        <Logo />
        <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-sm">
          <div className="absolute -right-16 top-8 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 left-10 h-60 w-60 rounded-full bg-black/15 blur-3xl" />
          <p className="relative mt-8 text-sm uppercase tracking-[0.4em] text-white/75">Varsigram Campus</p>
          <h1 className="relative mt-6 max-w-md text-5xl font-semibold leading-tight">
            Welcome back to campus communication.
          </h1>
          <p className="relative mt-6 max-w-md text-base leading-7 text-white/85">
            Log in with the details you created during the sign up flow.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-10 lg:px-16">
        <div className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 lg:rounded-[2.5rem] lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBackToWelcome}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 lg:hidden"
            >
              <ArrowLeft size={20} />
            </button>
            <Logo />
            <button type="button" onClick={onSignUp} className="text-sm font-semibold text-[#750015] hover:underline">
              Sign up
            </button>
          </div>

          <div className="mt-10 space-y-4 text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#750015]">Login</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Welcome back</h2>
            <p className="max-w-lg text-base leading-7 text-slate-600">
              Enter the email and password used during sign up.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
              error={error}
              icon={
                <button type="button" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <Button type="submit" fullWidth loading={isLoading}>
              Log In
            </Button>

            <p className="text-center text-sm text-slate-600">
              Need an account?{' '}
              <button type="button" onClick={onSignUp} className="font-semibold text-[#750015] hover:underline">
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};