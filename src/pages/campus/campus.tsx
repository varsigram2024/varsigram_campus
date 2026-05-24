import { Building2 } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { SearchBar } from '../../components/SearchBar';
import { RoomSection, type RoomItemData } from '../../components/RoomSection';
import { BottomActions } from '../../components/CampusPageLayout';

const facultiesData: RoomItemData[] = [
  { id: 'social-sciences', name: 'Social Sciences', hasNotification: true },
  { id: 'engineering', name: 'Engineering' },
  { id: 'medicine', name: 'Medicine & Health Sciences' },
  { id: 'sciences', name: 'Science & Technology' },
  { id: 'business', name: 'Business & Economics' },
  { id: 'law', name: 'Law & Justice' },
];

const otherRoomsData: RoomItemData[] = [
  { id: 'environmental-sciences', name: 'Environmental Sciences' },
  { id: 'management-sciences', name: 'Management Sciences' },
  { id: 'economics', name: 'Economics' },
  { id: 'law', name: 'Law' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'media-studies', name: 'Media and Communication Studies' },
];

export const Campus = () => {
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
        title="University of Lagos"
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
            title="Faculties"
            rooms={facultiesData}
            onRoomClick={handleRoomClick}
            activeRoomId={activeRoom}
          />
        </div>

        <div className="px-3 py-4">
          <RoomSection
            title="Other rooms"
            rooms={otherRoomsData}
            isCollapsed={false}
            onRoomClick={handleRoomClick}
            activeRoomId={activeRoom}
          />
        </div>

      <BottomActions />
      </div>


    </div>
  );
};
