import { Search, Bell } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  value?: string;
}

export const SearchBar = ({
  placeholder = 'Search messages',
  onSearch,
  value = '',
}: SearchBarProps) => {
  return (
    <div className="border-b border-gray-200 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-gray-100 pl-9 pr-3 py-2 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#750015]"
          />
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Bell size={18} />
        </button>
      </div>
    </div>
  );
};
