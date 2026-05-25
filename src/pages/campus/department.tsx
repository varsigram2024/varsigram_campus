import { Building2, Bell, Users, BookOpen, Briefcase, Zap, Calendar } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { SearchBar } from '../../components/SearchBar';
import { RoomSection, type RoomItemData } from '../../components/RoomSection';
import { BottomActions } from '../../components/CampusPageLayout';


const mainRoomsData: RoomItemData[] = [
  { id: 'announcement', name: 'Announcement', hasNotification: true, icon: <Bell size={16} /> },
  { id: 'inter-level-discourse', name: 'Inter-Level Discourse', icon: <Users size={16} /> },
  { id: 'dept-staff-room', name: 'Department Staff Room', icon: <Users size={16} /> },
];

const levelsData: RoomItemData[] = [
  { id: '400-level', name: '400 Level', icon: <BookOpen size={16} /> },
  { id: '300-level', name: '300 Level', icon: <BookOpen size={16} /> },
  { id: '200-level', name: '200 Level', icon: <BookOpen size={16} /> },
  { id: '100-level', name: '100 Level', icon: <BookOpen size={16} /> },
];

const otherRoomsData: RoomItemData[] = [
  { id: 'study-group', name: 'Study Group', icon: <Users size={16} /> },
  { id: 'projects', name: 'Projects', icon: <Zap size={16} /> },
  { id: 'career', name: 'Career Development', icon: <Briefcase size={16} /> },
  { id: 'events', name: 'Department Events', icon: <Calendar size={16} /> },
];
export const Department = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const handleRoomClick = (roomId: string) => {
    setActiveRoom(roomId);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <PageHeader
        icon={<Building2 size={24} className="text-[#750015]" />}
        title="Department of Economics"
      />

      {/* Search Bar */}
      <SearchBar
        placeholder="Search messages"
        value={searchQuery}
        onSearch={setSearchQuery}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
        <div className="px-3 py-4">
          <RoomSection
            title="Economics"
            rooms={mainRoomsData}
            onRoomClick={handleRoomClick}
            activeRoomId={activeRoom}
          />
        </div>

        <div className="px-3 py-4">
          <RoomSection
            title="Levels"
            rooms={levelsData}
            onRoomClick={handleRoomClick}
            activeRoomId={activeRoom}
          />
        </div>

        <div className="px-3 py-4">
          <RoomSection
            title="Other rooms"
            rooms={otherRoomsData}
            isCollapsed={true}
            onRoomClick={handleRoomClick}
            activeRoomId={activeRoom}
          />
        </div>

      <BottomActions />
      </div>

    </div>
  );
};
