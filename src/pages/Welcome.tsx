import { Logo } from '../components/Logo';

type WelcomeProps = {
  onGetStarted: () => void;
  onLogin: () => void;
};

export const Welcome = ({ onGetStarted, onLogin }: WelcomeProps) => {
  return (
    <div className="min-h-screen bg-[#f6f2f3] text-slate-900 lg:flex">
      <div className="hidden lg:flex lg:w-[44%] flex-col justify-between bg-gradient-to-br from-[#29000c] via-[#750015] to-[#ab243d] p-10 text-white">
        <Logo />
        <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-sm">
          <div className="absolute -right-16 top-8 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 left-10 h-60 w-60 rounded-full bg-black/15 blur-3xl" />
          <p className="relative mt-8 text-sm uppercase tracking-[0.4em] text-white/75">
            Varsigram Campus
          </p>
          <h1 className="relative mt-6 max-w-md text-5xl font-semibold leading-tight">
            Connect with your campus community.
          </h1>
          <p className="relative mt-6 max-w-md text-base leading-7 text-white/85">
            Discover conversations, build your profile, and join the flow of campus communication.
          </p>
        </div>
        <p className="text-sm text-white/70">A clean student-first sign up experience.</p>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-10 lg:px-16">
        <div className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 lg:rounded-[2.5rem] lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <Logo />
            <button type="button" onClick={onLogin} className="text-sm font-semibold text-[#750015] hover:underline">
              Log in
            </button>
          </div>

          <div className="mt-10 space-y-4 text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#750015]">
              Welcome
            </p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Get instant access to communication in your university
            </h2>
            <p className="max-w-lg text-base leading-7 text-slate-600">
              Sign up to create your account, verify your details, and complete your campus profile.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onGetStarted}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#750015] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#750015]/20 transition hover:bg-[#5d0011]"
            >
              Get Started
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-[#750015] hover:text-[#750015]"
            >
              Log In
            </button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {['Account creation', 'Profile details', 'Academic level'].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 px-4 py-5 text-sm font-medium text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};