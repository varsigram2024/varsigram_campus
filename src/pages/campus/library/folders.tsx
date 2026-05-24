import { useMemo } from 'react';
import { Upload, Camera, Plus } from 'lucide-react';

const sampleFolders = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  title: `International Economics ${i + 1}`,
}));

export const LibraryFolders = () => {
  const params = new URLSearchParams(window.location.search);
  const semester = params.get('semester') || 'first';

  const folders = useMemo(() => sampleFolders, []);

  const handleAction = (action: string) => {
    alert(`${action} clicked`);
  };

  return (
    <div className="min-h-screen bg-white lg:ml-0">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Library — {semester === 'first' ? 'First Semester' : 'Second Semester'}</h1>
            <p className="text-sm text-gray-600 mt-1">Select a folder or upload new resources.</p>
          </div>
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {folders.map((f) => (
    <div 
      key={f.id} 
      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex flex-col items-center text-center">
        {/* Folder Icon */}
        <div className="mb-3">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12C8 9.79086 9.79086 8 12 8H24L28 14H52C54.2091 14 56 15.7909 56 18V52C56 54.2091 54.2091 56 52 56H12C9.79086 56 8 54.2091 8 52V12Z" fill="#750015" fillOpacity="0.1" stroke="#750015" strokeWidth="1.5"/>
            <path d="M28 20H52V50H12V20H28Z" fill="#750015" fillOpacity="0.05" stroke="#750015" strokeWidth="1.5"/>
          </svg>
        </div>
        
        {/* Folder Title */}
        <h3 className="font-semibold text-gray-800 text-base mb-1">
          {f.title}
        </h3>
        
      
      </div>
    </div>
  ))}
</div>

        {/* Right floating actions */}
        <div className="fixed right-6 bottom-6 flex flex-col items-end gap-3">
          <div className="flex flex-col gap-3 items-end">
            <button onClick={() => handleAction('Upload')} className="flex items-center gap-3 rounded-lg bg-[#750015] px-4 py-3 text-white shadow-lg">
              <Upload size={16} />
              Upload
            </button>
            <button onClick={() => handleAction('Camera')} className="flex items-center gap-3 rounded-lg bg-[#750015] px-4 py-3 text-white shadow-lg">
              <Camera size={16} />
              Camera
            </button>
            <button onClick={() => handleAction('Create Folder')} className="flex items-center gap-3 rounded-lg bg-[#750015] px-4 py-3 text-white shadow-lg">
              <Plus size={16} />
              Create Folder
            </button>
          </div>

          <button className="flex items-center justify-center h-14 w-14 rounded-full bg-pink-400 text-white shadow-lg">
            <Upload size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
