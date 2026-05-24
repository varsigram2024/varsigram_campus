type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

const stepNames = ['Account', 'Academic', 'Level', 'Verify'];

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="h-1 overflow-hidden bg-slate-200">
        <div
          className="h-full bg-[#750015] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mx-auto flex max-w-4xl justify-between gap-2 px-4 py-4 text-[11px] font-medium text-slate-500 sm:px-6 sm:text-xs">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const active = index + 1 <= currentStep;
          return (
            <div key={stepNames[index]} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${active ? 'bg-[#750015] text-white' : 'bg-slate-200 text-slate-600'}`}
              >
                {index + 1}
              </div>
              <span className={active ? 'text-[#750015]' : ''}>{stepNames[index]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};