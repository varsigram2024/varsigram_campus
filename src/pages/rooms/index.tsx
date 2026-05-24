import { useMemo, useState } from 'react';
import { Plus, Users, Clock3, MessageSquare, X } from 'lucide-react';
import { Button } from '../../components/Button';
import { SearchBar } from '../../components/SearchBar';

export interface CourseRoom {
  id: string;
  name: string;
  lastMessage: string;
  unreadCount: number;
  memberCount: number;
}

interface RoomsIndexProps {
  rooms: CourseRoom[];
  onCreateRoom: (name: string) => void;
  onOpenRoom: (roomId: string) => void;
}

export const RoomsIndex = ({ rooms, onCreateRoom, onOpenRoom }: RoomsIndexProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomName, setRoomName] = useState('');

  const filteredRooms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return rooms;
    return rooms.filter((room) => room.name.toLowerCase().includes(query));
  }, [rooms, searchQuery]);

  const handleCreate = () => {
    const trimmed = roomName.trim();
    if (!trimmed) {
      alert('Please enter a room name');
      return;
    }

    onCreateRoom(trimmed);
    setRoomName('');
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f2f3] pb-28">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#750015]/70">Course rooms</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">All course rooms</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Create a room for a course, then open it like a chat to share updates, messages, and room activity.
            </p>
          </div>

          <Button onClick={() => setShowCreateModal(true)} className="shrink-0">
            <Plus size={18} />
            Create room
          </Button>
        </div>

        <SearchBar placeholder="Search course rooms" value={searchQuery} onSearch={setSearchQuery} />

        <div className="grid gap-3">
          {filteredRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onOpenRoom(room.id)}
              className="rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-gray-900">{room.name}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{room.lastMessage}</p>
                </div>
                {room.unreadCount > 0 && (
                  <span className="rounded-full bg-[#750015] px-2.5 py-1 text-xs font-semibold text-white">
                    {room.unreadCount}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Users size={14} />
                  {room.memberCount} members
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={14} />
                  Active now
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[#750015]">
                  <MessageSquare size={14} />
                  Open chat
                </span>
              </div>
            </button>
          ))}

          {filteredRooms.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="text-lg font-semibold text-gray-900">No rooms found</p>
              <p className="mt-2 text-sm text-gray-600">Create a new room to get started.</p>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50">
          <div className="w-full rounded-t-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#750015]/70">New room</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">Create course room</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <label className="mb-2 block text-sm font-medium text-gray-700">Room name</label>
            <input
              type="text"
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
              placeholder="e.g. ECN 451 - Advanced Macro-economics"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#750015] focus:ring-2 focus:ring-[#750015]/20"
            />

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" fullWidth onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button fullWidth onClick={handleCreate}>
                Create room
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};