import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ icon, title, subtitle }: PageHeaderProps) => {
  return (
    <div className="border-b border-gray-200 px-4 py-4">
      <div className="flex items-center gap-3 mb-1">
        {icon}
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </div>
      {subtitle && <p className="text-xs text-gray-500 ml-10">{subtitle}</p>}
    </div>
  );
};
