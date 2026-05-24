import { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { Logo } from '../../../components/Logo';

export const LibraryIndex = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('varsigram-campus-user');
      if (saved) {
        const parsed = JSON.parse(saved) as { fullName?: string };
        setUserName(parsed.fullName || null);
        return;
      }
    } catch (e) {}

    const session = window.sessionStorage.getItem('varsigram-campus-session');
    if (session) {
      const s = JSON.parse(session) as { email?: string };
      setUserName(s.email || null);
    }
  }, []);

  const goToFolders = (semester: 'first' | 'second') => {
    const path = `/campus/library/folders?semester=${semester}`;
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-white lg:ml-0 flex items-start">
      <div className="mx-auto w-full max-w-4xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back{userName ? `, ${userName.split(' ')[0]}` : ''} 👋</h1>
            <p className="text-sm text-gray-600 mt-1">What would you like to study today?</p>
          </div>
          {/* <Logo /> */}
        </div>

        <div className="mb-6">
          <input
            type="search"
            className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#750015]"
            placeholder="Search Library"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          <Button onClick={() => goToFolders('first')} className="w-full py-6" variant="outline">
            First Semester
          </Button>
          <Button onClick={() => goToFolders('second')} className="w-full py-6" variant="outline">
            Second Semester
          </Button>
        </div>
      </div>
    </div>
  );
};
