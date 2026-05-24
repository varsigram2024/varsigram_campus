import { Building2 } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { SearchBar } from '../../components/SearchBar';
import { RoomSection, type RoomItemData } from '../../components/RoomSection';
import { BottomActions } from '../../components/CampusPageLayout';


const mainRoomsData: RoomItemData[] = [
  { id: 'announcement', name: 'Announcement', hasNotification: true },
  { id: 'inter-level-discourse', name: 'Inter-Level Discourse' },
  { id: 'dept-staff-room', name: 'Department Staff Room' },
];

const levelsData: RoomItemData[] = [
  { id: '400-level', name: '400 Level' },
  { id: '300-level', name: '300 Level' },
  { id: '200-level', name: '200 Level' },
  { id: '100-level', name: '100 Level' },
];

const otherRoomsData: RoomItemData[] = [
  { id: 'study-group', name: 'Study Group' },
  { id: 'projects', name: 'Projects' },
  { id: 'career', name: 'Career Development' },
  { id: 'events', name: 'Department Events' },
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
