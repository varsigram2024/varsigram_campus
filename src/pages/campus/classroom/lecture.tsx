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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Lecture Room</h1>
            <div className="flex gap-6 mt-2 text-sm">
              <button
                className={`pb-2 border-b-2 transition ${
                  classMode === 'case-study'
                    ? 'border-[#750015] text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                onClick={() => setClassMode('case-study')}
              >
                Class mode
              </button>
              <button
                className={`pb-2 border-b-2 transition ${
                  classMode === 'questions'
                    ? 'border-[#750015] text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                onClick={() => setClassMode('questions')}
              >
                Participants ({sampleParticipants.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col p-6">
          {/* Lecture Info */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Fundamentals of Macro Economics</h2>
            <p className="text-gray-400 text-sm mt-1">Monday, 20th of May 2025 | 1pm - 5pm</p>
            <div className="flex items-center gap-2 mt-2 text-[#750015]">
              <span className="w-2 h-2 bg-[#750015] rounded-full"></span>
              <span className="font-semibold">{formatTime(elapsedTime)}</span>
            </div>
          </div>

          {/* Video Feed */}
          <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden mb-6 flex items-center justify-center relative group">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
              alt="Instructor"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-gray-900/80 rounded-lg p-4 backdrop-blur">
              <p className="text-white font-semibold">Prof. Adeola Ajanaku</p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`rounded-full p-4 transition ${
                isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Mic size={24} />
            </button>
            <button className="rounded-full p-4 bg-red-600 hover:bg-red-700 transition">
              <Phone size={24} />
            </button>
            <button className="rounded-full p-4 bg-gray-700 hover:bg-gray-600 transition">
              <MessageSquare size={24} />
            </button>
            <button className="rounded-full p-4 bg-gray-700 hover:bg-gray-600 transition">
              <Share2 size={24} />
            </button>
            <button className="rounded-full p-4 bg-gray-700 hover:bg-gray-600 transition">
              <MoreVertical size={24} />
            </button>
          </div>
        </div>

        {/* Participants Panel */}
        {classMode === 'questions' && (
          <div className="w-80 bg-gray-900 border-l border-gray-700 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Participants</h3>
            <div className="space-y-3">
              {sampleParticipants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition">
                  <div className="w-10 h-10 rounded-full bg-[#750015] flex items-center justify-center text-sm font-bold">
                    {participant.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{participant.name}</p>
                    {participant.isInstructor && <p className="text-xs text-[#750015]">Instructor</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
