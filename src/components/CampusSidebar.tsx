import { Menu, X, Home, Building2, Users } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';

type CampusPage = 'campus' | 'faculty' | 'department';

type CampusSidebarProps = {
  currentPage: CampusPage;
  onPageChange: (page: CampusPage) => void;
};

const sidebarLinks: { id: CampusPage; label: string; icon: React.ReactNode }[] = [
  {
    id: 'campus',
    label: 'Campus',
    icon: <Home size={20} />,
  },
  {
    id: 'faculty',
    label: 'Faculty',
    icon: <Building2 size={20} />,
  },
  {
    id: 'department',
    label: 'Department',
    icon: <Users size={20} />,
  },
];

export const CampusSidebar = ({ currentPage, onPageChange }: CampusSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-[#750015] text-white lg:hidden"
      >
        {isOpen ? <X size={12} /> : <Menu size={12} />}
      </button>

      {/* Sidebar Overlay - Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out z-40 lg:relative lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Content */}
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-gray-200 px-6 py-6">
            <Logo />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onPageChange(link.id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  currentPage === link.id
                    ? 'bg-[#750015] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {/* {link.icon} */}
                <span className="font-medium">{link.label}</span>
              </button>
            ))}
          </nav>

          

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <button className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
