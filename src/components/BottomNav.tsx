import { Building2, MessageSquare } from 'lucide-react';

type BottomSection = 'campus' | 'rooms';

interface BottomNavProps {
  activeSection: BottomSection;
  onNavigate: (section: BottomSection) => void;
}

export const BottomNav = ({ activeSection, onNavigate }: BottomNavProps) => {
  const buttonBase =
    'flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition active:scale-[0.99]';

  return (
    <div className="border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl gap-3">
        <button
          onClick={() => onNavigate('campus')}
          className={`${buttonBase} ${activeSection === 'campus' ? 'bg-[#750015] text-white shadow-lg shadow-[#750015]/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Building2 size={18} />
          Campus
        </button>
        <button
          onClick={() => onNavigate('rooms')}
          className={`${buttonBase} ${activeSection === 'rooms' ? 'bg-[#750015] text-white shadow-lg shadow-[#750015]/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <MessageSquare size={18} />
          Course Rooms
        </button>
      </div>
    </div>
  );
};