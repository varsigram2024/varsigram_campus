import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { RoomItem, type RoomItemData } from './RoomItem';

export type { RoomItemData };

interface RoomSectionProps {
  title: string;
  rooms: RoomItemData[];
  isCollapsed?: boolean;
  icon?: React.ReactNode;
  onRoomClick?: (roomId: string) => void;
  activeRoomId?: string | null;
}

export const RoomSection = ({
  title,
  rooms,
  isCollapsed = false,
  icon,
  onRoomClick,
  activeRoomId,
}: RoomSectionProps) => {
  const [isOpen, setIsOpen] = useState(!isCollapsed);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          {icon}
          {title}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-600 transition-transform ${
            isOpen ? 'rotate-0' : '-rotate-90'
          }`}
        />
      </button>

      {isOpen && (
        <div className="space-y-1 px-1">
          {rooms.map((room) => (
            <RoomItem
              key={room.id}
              {...room}
              isActive={activeRoomId === room.id}
              onClick={() => onRoomClick?.(room.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
