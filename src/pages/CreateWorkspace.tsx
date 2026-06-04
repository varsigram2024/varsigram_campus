import { useState } from 'react';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';

type CreateWorkspaceProps = {
  onBack: () => void;
  onCreateSuccess: () => void;
};

type WorkspaceType = 'campus' | 'faculty' | 'department';
type Institution = 'university-of-lagos' | 'lagos-state-university' | 'yaba-technology';

export const CreateWorkspace = ({ onBack, onCreateSuccess }: CreateWorkspaceProps) => {
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>('campus');
  const [workspaceName, setWorkspaceName] = useState('');
  const [institution, setInstitution] = useState<Institution>('university-of-lagos');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!workspaceName.trim()) {
      setError('Workspace name is required');
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      setError('Valid email is required');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log({
        workspaceType,
        workspaceName,
        institution,
        email,
      });
      setIsLoading(false);
      onCreateSuccess();
    }, 1000);
  };
  return (
    <div className="relative min-h-screen w-full bg-white text-black">
      {/* Background Animation */}
      <div 
        className="pointer-events-none absolute inset-0 w-full h-full opacity-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1440' height='1558' viewBox='0 0 1440 1558' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.05'%3E%3Cline x1='-73' y1='1321.06' x2='1654.87' y2='1321.06' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='583.225' x2='1654.87' y2='583.225' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='952.143' x2='1654.87' y2='952.143' stroke='black' stroke-width='1.4411'/%3E%3Cline x1='-73' y1='214.303' x2='1654.87' y2='214.303' stroke='black' stroke-width='1.4411'/%3E%3C/g%3E%3Cg opacity='9.5'%3E%3Crect x='903.41' y='793.965' width='91.7061' height='91.7061' fill='%23FFDBE2' fill-opacity='0.3'/%3E%3Crect x='442.258' y='793.965' width='91.7061' height='91.7061' fill='%23FFDBE2' fill-opacity='0.15'/%3E%3Crect x='1272.86' y='149.402' width='91.7061' height='90.396' fill='%23FFDBE2' fill-opacity='0.2'/%3E%3Crect x='533.965' y='425.773' width='91.7061' height='90.396' fill='%23FFDBE2' fill-opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <Logo />
          <button
            onClick={onBack}
            className="text-sm font-semibold text-black/80 transition hover:text-white hover:underline"
          >
            Back to Welcome
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative bg-[#E6E6E699] z-10 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 gap-8">
        <div>
            <img src="./rafiki.svg" alt="" />
        </div>
        <div className="text-black">
          <div className="mb-8">
            <h1 className="text-3xl font-medium">Create your academic workspace</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Workspace Type */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Workspace Type
              </label>
              <select
                value={workspaceType}
                onChange={(e) => setWorkspaceType(e.target.value as WorkspaceType)}
                className="w-full rounded-lg bg-white/5 border border-white/20 px-4 py-2.5 text-black placeholder-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/10 transition"
              >
                <option value="campus" className="bg-[#750015] text-white">Campus</option>
                <option value="faculty" className="bg-[#750015] text-white">Faculty</option>
                <option value="department" className="bg-[#750015] text-white">Department</option>
              </select>
            </div>

            {/* Workspace Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Workspace Name
              </label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="e.g., Computer Science Department"
                className="w-full rounded-lg bg-white/5 border border-white/20 px-4 py-2.5 text-black placeholder-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/10 transition"
              />
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Institution
              </label>
              <select
                value={institution}
                onChange={(e) => setInstitution(e.target.value as Institution)}
                className="w-full rounded-lg bg-white/5 border border-white/20 px-4 py-2.5 text-black placeholder-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/10 transition"
              >
                <option value="university-of-lagos" className="bg-[#750015] text-white">University of Lagos</option>
                <option value="lagos-state-university" className="bg-[#750015] text-white">Lagos State University</option>
                <option value="yaba-technology" className="bg-[#750015] text-white">Yaba Technology</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full rounded-lg bg-white/5 border border-white/20 px-4 py-2.5 text-black placeholder-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/10 transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-500/20 border border-red-500/50 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#750015] text-white font-semibold py-2.5 rounded-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? 'Creating Workspace...' : 'Create Workspace'}
            </Button>

           
          </form>
        </div>
      </div>
    </div>
  );
};
