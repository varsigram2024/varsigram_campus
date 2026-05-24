import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Camera,
  BookOpen,
  ClipboardList,
  Plus,
  Send,
  Users,
  Video,
  X,
} from 'lucide-react';
import { Button } from '../../components/Button';
import type { CourseRoom } from './index';

interface RoomChatProps {
  room: CourseRoom;
  onBack: () => void;
  onOpenTest: () => void;
  onOpenVirtualClassroom: () => void;
  onOpenLibrary: () => void;
}

type ChatMessage = {
  id: string;
  author: string;
  text: string;
  time: string;
  variant: 'incoming' | 'outgoing';
};

const defaultMessages: ChatMessage[] = [
  {
    id: 'm1',
    author: 'Dr Shittu Ayodele',
    time: 'Today, 1:53pm',
    text: 'Hello everyone, the CA test for ECN451 is coming up on 25th May, 2026.',
    variant: 'incoming',
  },
  {
    id: 'm2',
    author: 'Dr Shittu Ayodele',
    time: 'Today, 1:53pm',
    text: 'One that is set to revolutionize access to information across tertiary institutions across the world.',
    variant: 'outgoing',
  },
  {
    id: 'm3',
    author: 'Dr Shittu Ayodele',
    time: 'Today, 1:54pm',
    text: 'You are welcome to the D-SOSSA Room. Thank you for joining us!',
    variant: 'incoming',
  },
  {
    id: 'm4',
    author: 'Dr Shittu Ayodele',
    time: 'Today, 1:55pm',
    text: 'Please read the class slides and get ready for questions after the lecture.',
    variant: 'incoming',
  },
];

export const RoomChat = ({
  room,
  onBack,
  onOpenTest,
  onOpenVirtualClassroom,
  onOpenLibrary,
}: RoomChatProps) => {
  const [message, setMessage] = useState('');
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const messages = useMemo(() => defaultMessages, []);

  const initials = room.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#f8f6f7] pb-40">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <button
            onClick={onBack}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
            aria-label="Back to rooms"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#750015] text-sm font-bold text-white">
            {initials || 'CR'}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold text-gray-900 sm:text-base">{room.name}</h1>
            <p className="text-xs text-gray-500">Dr Shittu Ayodele · Lecturer</p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">
            <Users size={14} />
            {room.memberCount || 0}
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-4">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`max-w-[88%] rounded-3xl p-4 shadow-sm ${
              item.variant === 'outgoing'
                ? 'ml-auto bg-[#ffd9e0] text-gray-900'
                : 'mr-auto bg-white text-gray-900'
            }`}
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.author}</p>
                <p className="text-[11px] text-gray-500">{item.time}</p>
              </div>
              {item.variant === 'incoming' && (
                <span className="rounded-full bg-[#750015]/10 px-2 py-0.5 text-[10px] font-semibold text-[#750015]">
                  Lecturer
                </span>
              )}
            </div>
            <p className="whitespace-pre-wrap text-sm leading-6 text-gray-800">{item.text}</p>
          </div>
        ))}
      </main>

      <div className="fixed bottom-24 right-4 z-30">
        {isActionsOpen && (
          <div className="mb-3 w-64 rounded-3xl border border-gray-200 bg-white p-2 shadow-2xl">
            <button
              onClick={() => {
                setIsActionsOpen(false);
                onOpenTest();
              }}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ClipboardList size={18} className="text-[#750015]" />
              Take a test
            </button>
            <button
              onClick={() => {
                setIsActionsOpen(false);
                onOpenVirtualClassroom();
              }}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Video size={18} className="text-[#750015]" />
              Virtual classroom
            </button>
            <button
              onClick={() => {
                setIsActionsOpen(false);
                onOpenLibrary();
              }}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <BookOpen size={18} className="text-[#750015]" />
              Library
            </button>
          </div>
        )}

        <button
          onClick={() => setIsActionsOpen((current) => !current)}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff6f8f] text-white shadow-xl shadow-[#ff6f8f]/30 ring-4 ring-white transition hover:scale-105"
          aria-label="Open actions menu"
        >
          {isActionsOpen ? <X size={24} /> : <Plus size={24} />}
        </button>
      </div>

      <footer className="fixed bottom-20 left-4 right-4 z-20">
        <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-lg">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200">
            <Camera size={18} />
          </button>
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Send your message"
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
          <Button
            onClick={() => setMessage('')}
            className="h-10 w-10 rounded-full p-0"
            aria-label="Send message"
          >
            <Send size={18} />
          </Button>
        </div>
      </footer>
    </div>
  );
};