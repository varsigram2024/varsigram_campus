import { FormEvent, useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Logo } from '../components/Logo';
import { useSignUp } from '../auth/SignUpContext';

type SignUpFormProps = {
  onNext: () => void;
  onLogin: () => void;
  onBackToWelcome: () => void;
};

export const SignUpForm = ({ onNext, onLogin, onBackToWelcome }: SignUpFormProps) => {
  const { updateSignUpData } = useSignUp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const nextErrors: Partial<typeof formData> = {};
    let valid = true;

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Full name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(nextErrors);
    return valid;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    updateSignUpData({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    window.sessionStorage.setItem(
      'varsigram-campus-credentials',
      JSON.stringify({ email: formData.email, password: formData.password }),
    );
    onNext();
    setIsLoading(false);
  };

  return (
    <div className="grid min-h-[calc(100vh-7rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
      <div className="hidden lg:flex flex-col justify-between rounded-[2.5rem] bg-gradient-to-br from-[#29000c] via-[#750015] to-[#ab243d] p-10 text-white shadow-xl shadow-slate-900/10">
        <Logo />
        <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-8">
          <div className="absolute -right-16 top-8 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 left-10 h-60 w-60 rounded-full bg-black/15 blur-3xl" />
          <p className="relative mt-8 text-sm uppercase tracking-[0.4em] text-white/75">
            Varsigram Campus
          </p>
          <h1 className="relative mt-6 max-w-md text-5xl font-semibold leading-tight">
            Get instant access to communication in your university
          </h1>
          <p className="relative mt-6 max-w-md text-base leading-7 text-white/85">
            Create your account, then continue through the same five-step sign up flow.
          </p>
        </div>
      </div>

      <div className="rounded-[2rem] bg-white px-6 py-8 shadow-xl shadow-slate-900/5 sm:px-10 sm:py-10 lg:rounded-[2.5rem] lg:px-12 lg:py-12">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <button
            type="button"
            onClick={onBackToWelcome}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <Logo />
        </div>

        <div className="hidden items-center justify-between lg:flex">
          <button type="button" onClick={onBackToWelcome}>
            <Logo />
          </button>
          <button type="button" onClick={onLogin} className="text-sm font-semibold text-[#750015] hover:underline">
            Log In
          </button>
        </div>

        <div className="mt-8 sm:mt-10">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Create an Account
          </h2>
          <p className="mt-3 text-sm text-slate-600">Kindly fill in your details below</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            label=""
            placeholder="Full name"
            value={formData.fullName}
            onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
            error={errors.fullName}
          />

          <Input
            label=""
            type="email"
            placeholder="Student email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            error={errors.email}
          />

          <Input
            label=""
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            error={errors.password}
            icon={
              <button type="button" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <Input
            label=""
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(event) =>
              setFormData({ ...formData, confirmPassword: event.target.value })
            }
            error={errors.confirmPassword}
            icon={
              <button type="button" onClick={() => setShowConfirmPassword((value) => !value)}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <Button type="submit" fullWidth loading={isLoading}>
            Continue
          </Button>

          <p className="text-center text-sm text-slate-600">
            Already a Varsigram user?{' '}
            <button type="button" onClick={onLogin} className="font-semibold text-[#750015] hover:underline">
              Log In
            </button>
          </p>

          <p className="text-center text-xs leading-6 text-slate-500">
            By continuing, you agree to our campus community guidelines and privacy terms.
          </p>
        </form>
      </div>
    </div>
  );
};