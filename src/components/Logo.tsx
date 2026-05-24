export const Logo = () => {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#750015] text-white shadow-lg shadow-[#750015]/30">
        <span className="text-lg font-bold">V</span>
      </div>
      <div>
        <p className="text-lg font-semibold tracking-tight text-slate-900">Varsigram</p>
        <p className="-mt-1 text-xs font-medium uppercase tracking-[0.3em] text-[#750015]">
          Campus
        </p>
      </div>
    </div>
  );
};