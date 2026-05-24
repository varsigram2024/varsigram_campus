import { useState } from 'react';
import { Button } from '../components/Button';
import { useSignUp } from '../auth/SignUpContext';

type AcademicLevelProps = {
  onBack: () => void;
  onNext: () => void;
};

const levels = ['100', '200', '300', '400', '500'];

export const AcademicLevel = ({ onBack, onNext }: AcademicLevelProps) => {
  const { updateSignUpData } = useSignUp();
  const [level, setLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!level) return;

    setIsLoading(true);
    updateSignUpData({ level });
    setIsLoading(false);
    onNext();
  };

  return (
    <div className="mx-auto max-w-[520px] rounded-[2rem] bg-white px-6 py-8 shadow-xl shadow-slate-900/5 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Academic Level</h1>
      <p className="mt-3 text-sm text-slate-600">Select your current academic level</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Academic level</span>
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            className="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-[#750015] focus:ring-4 focus:ring-[#750015]/10"
          >
            <option value="">Select your level</option>
            {levels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" className="flex-1" loading={isLoading} disabled={!level}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};