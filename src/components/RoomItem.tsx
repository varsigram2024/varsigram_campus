export interface RoomItemData {
  id: string;
  name: string;
  hasNotification?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface RoomItemProps extends RoomItemData {
  isActive?: boolean;
}

export const RoomItem = ({ id, name, hasNotification, icon, isActive, onClick }: RoomItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition ${
        isActive
          ? 'bg-[#750015]/10 text-[#750015]'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-medium">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {name}
      </span>
      {hasNotification && (
        <div className="h-2 w-2 rounded-full bg-[#750015]" />
      )}
    </button>
  );
};
