import { useState, FormEvent } from 'react';
import { Key, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Logo } from '../components/Logo';

type JoinWithCodeProps = {
  onBack: () => void;
  onJoinSuccess: (code: string) => void;
};

export const JoinWithCode = ({ onBack, onJoinSuccess }: JoinWithCodeProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Please enter a room code');
      return;
    }

    if (code.trim().length < 4) {
      setError('Room code must be at least 4 characters');
      return;
    }

    setIsLoading(true);
    // Simulate joining room with code
    setTimeout(() => {
      setIsLoading(false);
      onJoinSuccess(code);
      setCode('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 lg:flex">
      {/* Left Panel - Desktop Only */}
      <div className="hidden lg:flex lg:w-[44%] flex-col justify-between bg-gradient-to-br from-[#29000c] via-[#750015] to-[#ab243d] p-10 text-white">
        <Logo />
        <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-sm">
          <div className="absolute -right-16 top-8 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 left-10 h-60 w-60 rounded-full bg-black/15 blur-3xl" />
          <p className="relative mt-8 text-sm uppercase tracking-[0.4em] text-white/75">Join Room</p>
          <h1 className="relative mt-6 max-w-md text-5xl font-semibold leading-tight">
            Access new rooms with invitation codes.
          </h1>
          <p className="relative mt-6 max-w-md text-base leading-7 text-white/85">
            Enter the room code provided to you to join exclusive student communities and discussion groups.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 sm:px-10 lg:px-16">
        <img src="/pana.svg" alt="Join room illustration" className="w-64 h-64 object-contain" />
        <div className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 lg:rounded-[2.5rem] lg:p-10">
  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Room Code"
              type="text"
              placeholder="Enter the room code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              error={error}
              icon={<Key size={18} className="text-slate-400" />}
            />

            <p className="text-sm text-slate-500">
              Codes are typically provided by room administrators and are case-sensitive.
            </p>

            <Button type="submit" fullWidth loading={isLoading}>
              Join Room
              <ArrowRight size={18} />
            </Button>

            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-lg border-2 border-slate-200 px-6 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95"
            >
              Back to Rooms
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
