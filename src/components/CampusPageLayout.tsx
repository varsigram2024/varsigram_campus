import { Library, BookOpen } from 'lucide-react';

interface CampusPageLayoutProps {
  children: React.ReactNode;
}

export const CampusPageLayout = ({ children }: CampusPageLayoutProps) => {
  return (
    <div className="flex h-screen lg:h-auto">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

interface BottomActionsProps {
  onVirtualClassroom?: () => void;
  onLibrary?: () => void;
}

export const BottomActions = ({ onVirtualClassroom, onLibrary }: BottomActionsProps) => {
  return (
    <div className="border-t border-gray-200 mt-auto">
      <button
        onClick={() => {
          if (onVirtualClassroom) return onVirtualClassroom();
          window.history.pushState({}, '', '/campus/classroom');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <BookOpen size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Virtual Classroom</span>
        </div>
      </button>
      <button
        onClick={() => {
          if (onLibrary) return onLibrary();
          window.history.pushState({}, '', '/campus/library');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition border-t border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Library size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Library</span>
        </div>
      </button>
    </div>
  );
};
