import { Mic, Phone, MessageSquare, Share2, MoreVertical } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Participant {
  id: string;
  name: string;
  initial: string;
  isInstructor?: boolean;
}

const sampleParticipants: Participant[] = [
  { id: '1', name: 'Prof. Adeola Ajanaku', initial: 'A', isInstructor: true },
  { id: '2', name: 'Mia', initial: 'M' },
  { id: '3', name: 'Yusuf', initial: 'Y' },
  { id: '4', name: 'Donald', initial: 'D' },
  { id: '5', name: 'Samuel', initial: 'S' },
  { id: '6', name: 'Abdullah', initial: 'A' },
  { id: '7', name: 'Winifred', initial: 'W' },
  { id: '8', name: 'Nneoma', initial: 'N' },
];

export const LectureRoom = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [classMode, setClassMode] = useState<'case-study' | 'questions'>('case-study');

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lecture Room</h1>
          <div className="flex gap-8 mt-3 text-sm">
            <button
              className={`pb-2 border-b-2 transition font-medium ${
                classMode === 'case-study'
                  ? 'border-[#750015] text-[#750015]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setClassMode('case-study')}
            >
              Live
            </button>
            <button
              className={`pb-2 border-b-2 transition font-medium ${
                classMode === 'case-study'
                  ? 'border-transparent text-gray-500 hover:text-gray-700'
                  : 'border-[#750015] text-[#750015]'
              }`}
              onClick={() => setClassMode('questions')}
            >
              Class mode
            </button>
            <button
              className="pb-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition font-medium"
            >
              Participants ({sampleParticipants.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
        {/* Lecture Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Fundamentals of Macro Economics</h2>
          <p className="text-gray-500 text-sm mt-1">Monday, 20th of May 2025 | 1pm - 5pm</p>
          <div className="flex items-center gap-2 mt-2 text-[#750015]">
            <span className="w-2 h-2 bg-[#750015] rounded-full"></span>
            <span className="font-semibold text-sm">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* Main Video Feed */}
        <div className="mb-6">
          <div className="w-full aspect-video bg-gray-300 rounded-xl overflow-hidden flex items-center justify-center relative group">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop"
              alt="Instructor"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-white font-semibold text-sm">Prof. Adeola Ajanaku</p>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`rounded-full p-3 transition ${
              isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            <Mic size={20} className={isMuted ? 'text-white' : 'text-gray-700'} />
          </button>
          <button className="rounded-full p-3 bg-red-600 hover:bg-red-700 transition">
            <Phone size={20} className="text-white" />
          </button>
          <button className="rounded-full p-3 bg-gray-300 hover:bg-gray-400 transition">
            <MessageSquare size={20} className="text-gray-700" />
          </button>
          <button className="rounded-full p-3 bg-gray-300 hover:bg-gray-400 transition">
            <Share2 size={20} className="text-gray-700" />
          </button>
          <button className="rounded-full p-3 bg-gray-300 hover:bg-gray-400 transition">
            <MoreVertical size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Participants Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Participants</h3>
          <div className="grid grid-cols-3 gap-3">
            {sampleParticipants.map((participant) => (
              <div key={participant.id} className="relative group">
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg overflow-hidden flex items-center justify-center relative">
                  {/* Placeholder for video feed */}
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    {participant.id === '1' && (
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
                        alt={participant.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {participant.id !== '1' && (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#750015] flex items-center justify-center text-white font-bold text-lg mb-2">
                          {participant.initial}
                        </div>
                        <p className="text-xs text-gray-600 font-medium text-center px-2">{participant.name.split(' ')[0]}</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full text-xs">●</span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full text-xs">●</span>
                  </div>
                </div>
                <p className="text-xs text-gray-700 font-medium mt-2 text-center truncate">
                  {participant.name.split(' ')[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
