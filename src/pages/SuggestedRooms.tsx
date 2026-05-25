import { useState } from 'react';
import { Users, Key } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  department: string;
  memberCount: number;
  isJoined?: boolean;
}

interface SuggestedRoomsProps {
  rooms?: Room[];
  onJoinRoom?: (roomId: string) => void;
  onJoinWithCode?: () => void;
  onBackToWelcome?: () => void;
}

const defaultRooms: Room[] = [
  {
    id: '1',
    name: 'Department of Economics',
    department: '',
    memberCount: 234,
  },
  // {
  //   id: '2',
  //   name: 'Economics Research Hub',
  //   department: 'Department of Economics',
  //   memberCount: 156,
  // },
  // {
  //   id: '3',
  //   name: 'Economics Career Network',
  //   department: 'Department of Economics',
  //   memberCount: 89,
  // },
];

export const SuggestedRooms = ({ 
  rooms = defaultRooms, 
  onJoinRoom, 
  onJoinWithCode,
  onBackToWelcome
}: SuggestedRoomsProps) => {
  const [joinedRooms, setJoinedRooms] = useState<string[]>([]);

  const handleJoinRoom = (roomId: string) => {
    if (joinedRooms.includes(roomId)) return;
    
    setJoinedRooms([...joinedRooms, roomId]);
    if (onJoinRoom) {
      onJoinRoom(roomId);
    }
    // Show success feedback
    alert('Request to join sent!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Suggested Rooms for you
        </h2>
        <p className="text-gray-500 text-sm">
          Join rooms based on your department and interests
        </p>
      </div>

      {/* Rooms List */}
      <div className="space-y-4 mb-8">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{room.name}</h3>
              <p className="text-sm text-gray-500">{room.department}</p>
              <div className="flex items-center gap-2 mt-1">
                <Users className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">{room.memberCount} members</span>
              </div>
            </div>
            
            <button
              onClick={() => handleJoinRoom(room.id)}
              disabled={joinedRooms.includes(room.id)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                joinedRooms.includes(room.id)
                  ? 'bg-green-100 text-green-600 cursor-default'
                  : 'bg-[#750015] text-white hover:bg-[#5a0010] active:scale-95'
              }`}
            >
              {joinedRooms.includes(room.id) ? (
                'Request Sent ✓'
              ) : (
                <>
                  Request to join
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* OR Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-white text-gray-400 text-sm font-medium">OR</span>
        </div>
      </div>

      {/* Join with Code Section */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Have access to the code? Input here
        </p>
        
        <button
          onClick={() => onJoinWithCode && onJoinWithCode()}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#750015] text-[#750015] rounded-lg hover:bg-[#750015] hover:text-white transition-all font-medium"
        >
          <Key className="w-4 h-4" />
          Join with Code
        </button>
      </div>
    </div>
  );
};