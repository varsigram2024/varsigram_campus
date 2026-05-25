import { Building2, Bell, Users, BookOpen, Cpu, Stethoscope, TrendingUp, Scale } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { SearchBar } from '../../components/SearchBar';
import { RoomSection, type RoomItemData } from '../../components/RoomSection';
import { BottomActions } from '../../components/CampusPageLayout';

const campusData: RoomItemData[] = [
  { id: 'announcement', name: 'Announcement', hasNotification: true, icon: <Bell size={16} /> },
  { id: 'inter-faculty', name: 'Inter-Faculty', icon: <Users size={16} /> },
  { id: 'staff', name: 'UNILAG Staff Room', icon: <Users size={16} /> },
];

const facultiesData: RoomItemData[] = [
  { id: 'social-sciences', name: 'Social Sciences', hasNotification: true, icon: <BookOpen size={16} /> },
  { id: 'engineering', name: 'Engineering', icon: <Cpu size={16} /> },
  { id: 'medicine', name: 'Medicine & Health Sciences', icon: <Stethoscope size={16} /> },
  { id: 'sciences', name: 'Science & Technology', icon: <BookOpen size={16} /> },
  { id: 'business', name: 'Business & Economics', icon: <TrendingUp size={16} /> },
  { id: 'law', name: 'Law & Justice', icon: <Scale size={16} /> },
];

const otherRoomsData: RoomItemData[] = [
  { id: 'environmental-sciences', name: 'Environmental Sciences', icon: <BookOpen size={16} /> },
  { id: 'management-sciences', name: 'Management Sciences', icon: <TrendingUp size={16} /> },
  { id: 'economics', name: 'Economics', icon: <TrendingUp size={16} /> },
  { id: 'law', name: 'Law', icon: <Scale size={16} /> },
  { id: 'engineering', name: 'Engineering', icon: <Cpu size={16} /> },
  { id: 'media-studies', name: 'Media and Communication Studies', icon: <BookOpen size={16} /> },
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
            title="UNILAG Campus"
            rooms={campusData}
            onRoomClick={handleRoomClick}
            activeRoomId={activeRoom}
          />
        </div>

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
