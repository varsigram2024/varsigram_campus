import { Building2, Bell, Users, TrendingUp, Globe, Heart, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { SearchBar } from '../../components/SearchBar';
import { RoomSection, type RoomItemData } from '../../components/RoomSection';
import { BottomActions } from '../../components/CampusPageLayout';

const mainRoomsData: RoomItemData[] = [
  { id: 'announcement', name: 'Announcement', hasNotification: true, icon: <Bell size={16} /> },
  { id: 'inter-dept-discourse', name: 'Inter-Department Discourse', icon: <Users size={16} /> },
  { id: 'faculty-staff-room', name: 'Faculty Staff Room', icon: <Users size={16} /> },
];

const departmentsData: RoomItemData[] = [
  { id: 'economics', name: 'Economics', icon: <TrendingUp size={16} /> },
  { id: 'political-science', name: 'Political Science', icon: <BookOpen size={16} /> },
  { id: 'geography', name: 'Geography', icon: <Globe size={16} /> },
  { id: 'social-work', name: 'Social Work', icon: <Heart size={16} /> },
  { id: 'sociology', name: 'Sociology', icon: <Users size={16} /> },
  { id: 'psychology', name: 'Psychology', icon: <BookOpen size={16} /> },
];

const otherRoomsData: RoomItemData[] = [
  { id: 'political-science-other', name: 'Political Science', icon: <BookOpen size={16} /> },
  { id: 'geography-other', name: 'Geography', icon: <Globe size={16} /> },
  { id: 'social-work-other', name: 'Social Work', icon: <Heart size={16} /> },
  { id: 'sociology-other', name: 'Sociology', icon: <Users size={16} /> },
  { id: 'psychology-other', name: 'Psychology', icon: <BookOpen size={16} /> },
];

export const Faculty = () => {
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
        title="Faculty of Social Sciences"
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
            title="Social Sciences"
            rooms={mainRoomsData}
            onRoomClick={handleRoomClick}
            activeRoomId={activeRoom}
          />
        </div>

        <div className="px-3 py-4">
          <RoomSection
            title="Departments"
            rooms={departmentsData}
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
