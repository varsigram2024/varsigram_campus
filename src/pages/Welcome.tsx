import { Button } from '../components/Button';
import { Logo } from '../components/Logo';

type WelcomeProps = {
  onGetStarted: () => void;
  onLogin: () => void;
};

export const Welcome = ({ onGetStarted, onLogin }: WelcomeProps) => {
  
  return (
    <div className="relative min-h-screen bg-[#750015] text-white lg:flex">
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

       {/* Background Animation */}
      <div 
        className="pointer-events-none absolute inset-0 w-full h-full opacity-100 animate-pulse-slow"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1440' height='1558' viewBox='0 0 1440 1558' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.05'%3E%3Cline x1='-73' y1='1321.06' x2='1654.87' y2='1321.06' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='583.225' x2='1654.87' y2='583.225' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='952.143' x2='1654.87' y2='952.143' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='214.303' x2='1654.87' y2='214.303' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='1136.6' x2='1654.87' y2='1136.6' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='398.76' x2='1654.87' y2='398.76' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='767.682' x2='1654.87' y2='767.682' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='29.842' x2='1654.87' y2='29.842' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='1228.83' x2='1654.87' y2='1228.83' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='490.994' x2='1654.87' y2='490.994' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='859.916' x2='1654.87' y2='859.916' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='122.072' x2='1654.87' y2='122.072' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='1044.38' x2='1654.87' y2='1044.38' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='306.533' x2='1654.87' y2='306.533' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='675.455' x2='1654.87' y2='675.455' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='718.885' y1='-187.043' x2='718.885' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='349.963' y1='-187.043' x2='349.963' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='1087.8' y1='-187.043' x2='1087.8' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='165.502' y1='-187.043' x2='165.502' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='903.342' y1='-187.043' x2='903.342' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='534.424' y1='-187.043' x2='534.424' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='1272.26' y1='-187.043' x2='1272.26' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='73.2713' y1='-187.043' x2='73.2713' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='811.111' y1='-187.043' x2='811.111' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='442.189' y1='-187.043' x2='442.189' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='1180.03' y1='-187.043' x2='1180.03' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='257.736' y1='-187.043' x2='257.736' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='995.576' y1='-187.043' x2='995.576' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='626.65' y1='-187.043' x2='626.65' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='1364.49' y1='-187.043' x2='1364.49' y2='1147.41' stroke='black' stroke-width='1.4411'/%3E%3C/g%3E%3Cg opacity='9.5'%3E%3Crect x='903.41' y='793.965' width='91.7061' height='91.7061' fill='%23FFDBE2' fill-opacity='0.5'/%3E%3Crect x='442.258' y='793.965' width='91.7061' height='91.7061' fill='%23FFDBE2' fill-opacity='0.2'/%3E%3Crect x='1272.86' y='149.402' width='91.7061' height='90.396' fill='%23FFDBE2' fill-opacity='0.25'/%3E%3Crect x='533.965' y='425.773' width='91.7061' height='90.396' fill='%23FFDBE2' fill-opacity='0.15'/%3E%3Crect x='1179.84' y='241.109' width='91.7061' height='90.396' fill='%23FFDBE2' fill-opacity='0.25'/%3E%3Crect x='442.094' y='149.402' width='91.7061' height='90.396' fill='%23FFDBE2' fill-opacity='0.15'/%3E%3Crect x='1179.84' y='149.402' width='91.7061' height='90.396' fill='%23FFDBE2' fill-opacity='0.25'/%3E%3Crect x='442.094' y='425.773' width='91.7061' height='90.396' fill='%23FFDBE2' fill-opacity='0.15'/%3E%3Crect x='350.551' y='793.965' width='91.7061' height='91.7061' fill='%23FFDBE2' fill-opacity='0.2'/%3E%3Crect x='350.551' y='885.672' width='91.7061' height='93.0162' fill='%23FFDBE2' fill-opacity='0.2'/%3E%3Crect x='165.832' y='702.258' width='91.7061' height='91.7061' fill='%23FFDBE2' fill-opacity='0.2'/%3E%3Crect x='1088.13' y='-35.3164' width='91.7061' height='91.7061' fill='%23FFDBE2' fill-opacity='0.15'/%3E%3Crect x='995.422' y='-35.8086' width='91.7061' height='91.4801' fill='%23FFDBE2' fill-opacity='0.15'/%3E%3Crect x='165.832' y='55.0742' width='93.0162' height='94.3262' fill='%23FFDBE2' fill-opacity='0.2'/%3E%3Crect x='72.8164' y='-36.6328' width='93.0162' height='91.7061' fill='%23FFDBE2' fill-opacity='0.2'/%3E%3Crect x='-18.8906' y='-35.3242' width='93.0162' height='91.7061' fill='%23FFDBE2' fill-opacity='0.2'/%3E%3Crect x='72.8164' y='55.0742' width='93.0162' height='94.3262' fill='%23FFDBE2' fill-opacity='0.2'/%3E%3Crect x='165.832' y='239.797' width='91.7061' height='93.0162' fill='%23FFDBE2' fill-opacity='0.2'/%3E%3Crect x='1272.86' y='702.258' width='91.7061' height='91.7061' fill='%23FFDBE2' fill-opacity='0.15'/%3E%3Crect x='1364.56' y='793.965' width='91.7061' height='91.7061' fill='%23FFDBE2' fill-opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

       {/* Header */}
      <header 
        className={`max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-10 transition-all duration-700`}
      >
        <div className="flex items-center gap-2">
          <svg width="67" height="47" viewBox="0 0 67 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M56.765 0.911716C56.8533 0.90329 56.9422 0.900541 57.0308 0.903486C57.5942 0.924193 59.2848 1.26086 59.6953 1.53087C61.0564 2.42616 65.949 5.7654 66.8543 6.73992C66.8991 7.09533 61.8075 13.8833 61.2095 14.7002L50.5635 29.2478L43.1345 39.4056C41.8344 41.1851 38.7992 46.0284 36.7442 46.4363C35.4091 47.3546 32.4206 46.7652 31.1101 45.9648C27.3775 43.6849 25.4603 39.8162 28.2886 35.9028C30.1458 33.3332 32.0511 30.7417 33.9269 28.178L44.8447 13.2572L49.9285 6.30636C52.2557 3.12806 52.6827 1.64025 56.765 0.911716Z" fill="white"/>
              <path d="M32.4137 3.00064C32.6236 2.98821 32.8337 2.98149 33.0438 2.98048C36.3236 2.97516 38.032 4.86144 40.1231 6.97254L43.2201 10.0793C39.4153 15.263 35.2043 20.5858 31.2928 25.7159L26.919 31.4511C25.5105 33.2966 24.7179 34.7248 22.6498 35.8944C21.9842 36.1452 21.5561 36.3326 20.8386 36.4308C18.6996 36.7234 17.4007 36.1243 15.7207 34.9327C14.0282 33.7323 12.9491 32.5388 12.5376 30.4316C12.2554 28.9867 12.6329 27.0689 13.4989 25.881C17.126 20.9057 20.7746 15.9385 24.4084 10.9662L27.4401 6.80751C29.0766 4.56548 29.467 3.48899 32.4137 3.00064Z" fill="white"/>
              <path d="M7.97934 5.93301C12.7144 5.74548 17.3731 9.24299 20.8482 12.1335L14.8369 19.4656C13.8461 20.6706 12.1838 22.8128 11.0989 23.8335C8.23516 26.055 5.23761 25.8523 2.50478 23.6716C0.902919 22.3933 0.455457 21.3527 0.161703 19.3411C-0.348086 15.85 0.331052 11.9103 2.43334 9.0284C3.99184 6.98919 5.49943 6.27867 7.97934 5.93301Z" fill="white"/>
              </svg>

          <h2 className="text-lg sm:text-xl font-bold sm:block">Varsigram</h2>
        </div>
        <div className="items-center hidden lg:flex">
          <Button 
            onClick={onGetStarted}
            className="bg-white text-[#750015] z-10 border-2 transition-all duration-300 hover:scale-105 active:scale-95 transform hover:-translate-y-1 text-sm sm:text-base"
          >
            <span className='text-[#750015]'>Get Started</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-10 lg:px-16">
        <div className="w-full max-w-xl rounded-[2rem] bg-[#750015] p-6 shadow-xl shadow-slate-900/5 sm:p-8 lg:rounded-[2.5rem] lg:p-10">
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