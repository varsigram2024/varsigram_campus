import {
  Mic,
  Phone,
  MessageSquare,
  Share2,
  MoreVertical,
  PenLine,
  Eraser,
  Palette,
  Trash2,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { AttendanceSheet } from './attendance-sheet';

interface Participant {
  id: string;
  name: string;
  initial: string;
  isInstructor?: boolean;
}

const sampleParticipants: Participant[] = [
  { id: '1', name: 'Prof. Adeola Ajanaku', initial: 'A', isInstructor: true },
  { id: '2', name: 'Mia', initial: 'M' },
  { id: '3', name: 'Yusuf', initial: 'Y' },
  { id: '4', name: 'Donald', initial: 'D' },
  { id: '5', name: 'Samuel', initial: 'S' },
  { id: '6', name: 'Abdullah', initial: 'A' },
  { id: '7', name: 'Winifred', initial: 'W' },
  { id: '8', name: 'Nneoma', initial: 'N' },
];

export const LectureRoom = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [classMode, setClassMode] = useState<'case-study' | 'board'>('case-study');
  const [showAttendanceSheet, setShowAttendanceSheet] = useState(false);
  const [activeTool, setActiveTool] = useState<'pen' | 'eraser'>('pen');
  const [activeColor, setActiveColor] = useState('#750015');

  const [elapsedTime, setElapsedTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boardContainerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const boardColors = ['#750015', '#111827', '#2563EB', '#16A34A', '#DC2626'];

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (classMode !== 'board') return;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const boardContainer = boardContainerRef.current;
      if (!canvas || !boardContainer) return;

      const oldCanvas = document.createElement('canvas');
      oldCanvas.width = canvas.width;
      oldCanvas.height = canvas.height;
      const oldCtx = oldCanvas.getContext('2d');
      if (oldCtx) {
        oldCtx.drawImage(canvas, 0, 0);
      }

      canvas.width = boardContainer.clientWidth;
      canvas.height = boardContainer.clientHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.lineJoin = 'round';
        if (oldCanvas.width > 0 && oldCanvas.height > 0) {
          context.drawImage(oldCanvas, 0, 0);
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [classMode]);

  const drawLine = (fromX: number, fromY: number, toX: number, toY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.strokeStyle = activeTool === 'eraser' ? 'rgba(0,0,0,1)' : activeColor;
    context.lineWidth = activeTool === 'eraser' ? 18 : 3;
    context.globalCompositeOperation = activeTool === 'eraser' ? 'destination-out' : 'source-over';
    context.stroke();
  };

  const getCanvasCoordinates = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = getCanvasCoordinates(event);
    if (!point) return;

    isDrawingRef.current = true;
    lastPointRef.current = point;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    const point = getCanvasCoordinates(event);
    if (!point) return;

    drawLine(lastPointRef.current.x, lastPointRef.current.y, point.x, point.y);
    lastPointRef.current = point;
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  if (showAttendanceSheet) {
    return (
      <AttendanceSheet
        onBack={() => setShowAttendanceSheet(false)}
        classroomName="Fundamentals of Macro Economics"
        classDate="Monday, 20th of May 2025"
        classDuration="1pm - 5pm"
      />
    );
  }

  return (
    <div className="h-dvh bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lecture Room</h1>
          <div className="flex justify-between gap-8 mt-3 text-sm">
            <button
              className={`pb-2 border-b-2 transition font-medium ${
                classMode === 'case-study'
                  ? 'border-[#750015] text-[#750015]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setClassMode('case-study')}
            >
              Live
            </button>
            <button
              className={`pb-2 border-b-2 transition font-medium ${
                classMode === 'case-study'
                  ? 'border-transparent text-gray-500 hover:text-gray-700'
                  : 'border-[#750015] text-[#750015]'
              }`}
              onClick={() => setClassMode('board')}
            >
              Board
            </button>
            <button
              className="pb-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition font-medium"
            >
              Participants ({sampleParticipants.length})
            </button>
          </div>
        </div>
      </div>

      {classMode === 'board' ? (
        <div className="flex min-h-0 flex-1 flex-col bg-gray-50">
          <div className="px-4 pb-4 pt-5 sm:px-6">
            <div className="rounded-xl bg-gray-100 p-4">
              <h2 className="text-2xl font-normal text-gray-900">Fundamentals of Macro Economics</h2>
              <p className="mt-2 text-sm text-[#750015]">Monday, 23rd of May 2025 &nbsp; | &nbsp; 3pm - 5pm</p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[#750015]">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[8px]">●</span>
              <span className="text-2xl font-normal text-gray-900">{formatTime(elapsedTime)}</span>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden bg-[#efefef]">
            <div
              ref={boardContainerRef}
              className="relative h-full w-full"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)',
                backgroundSize: '34px 34px',
              }}
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 bg-white px-4 py-3">
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-xl border border-gray-200 bg-[#f5f5f5] p-2">
              <button
                onClick={() => setActiveTool('pen')}
                className={`rounded-lg p-2 transition ${activeTool === 'pen' ? 'bg-[#750015] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                title="Pen"
              >
                <PenLine size={18} />
              </button>

              <button
                onClick={() => setActiveTool('eraser')}
                className={`rounded-lg p-2 transition ${activeTool === 'eraser' ? 'bg-[#750015] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                title="Eraser"
              >
                <Eraser size={18} />
              </button>

              <div className="flex items-center gap-2 rounded-lg bg-white px-2 py-1">
                <Palette size={16} className="text-gray-600" />
                {boardColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setActiveColor(color);
                      setActiveTool('pen');
                    }}
                    className={`h-5 w-5 rounded-full border ${activeColor === color && activeTool === 'pen' ? 'ring-2 ring-[#750015] ring-offset-1' : ''}`}
                    style={{ backgroundColor: color }}
                    title={`Color ${color}`}
                  />
                ))}
              </div>

              <button
                onClick={clearBoard}
                className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-200"
                title="Clear board"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Fundamentals of Macro Economics</h2>
            <p className="text-gray-500 text-sm mt-1">Monday, 20th of May 2025 | 1pm - 5pm</p>
            <div className="flex items-center gap-2 mt-2 text-[#750015]">
              <span className="w-2 h-2 bg-[#750015] rounded-full"></span>
              <span className="font-semibold text-sm">{formatTime(elapsedTime)}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="w-full aspect-video bg-gray-300 rounded-xl overflow-hidden flex items-center justify-center relative group">
              <img
                src="/ajanaku.jpg"
                alt="Instructor"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-white font-semibold text-sm">Prof. Adeola Ajanaku</p>
              </div>
            </div>
          </div>

         

          <div className="mb-8">
            <div className="grid grid-cols-3 gap-3">
              {sampleParticipants.map((participant) => (
                <div key={participant.id} className="relative group">
                  <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg overflow-hidden flex items-center justify-center relative">
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      {participant.id === '1' && (
                        <img
                          src="/ajanaku.jpg"
                          alt={participant.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {participant.id !== '1' && (
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#750015] flex items-center justify-center text-white font-bold text-lg mb-2">
                            {participant.initial}
                          </div>
                          <p className="text-xs text-gray-600 font-medium text-center px-2">{participant.name.split(' ')[0]}</p>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full text-xs">●</span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full text-xs">●</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 font-medium mt-2 text-center truncate">
                    {participant.name.split(' ')[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>

           <div className="flex sticky bottom-0 bg-white border rounded-2xl shadow-2xl p-3 items-center justify-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`rounded-full p-3 transition ${
                isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              <Mic size={20} className={isMuted ? 'text-white' : 'text-gray-700'} />
            </button>
            <button className="rounded-full p-3 bg-red-600 hover:bg-red-700 transition">
              <Phone size={20} className="text-white" />
            </button>
            <button className="rounded-full p-3 bg-gray-300 hover:bg-gray-400 transition">
              <MessageSquare size={20} className="text-gray-700" />
            </button>
            <button className="rounded-full p-3 bg-gray-300 hover:bg-gray-400 transition">
              <Share2 size={20} className="text-gray-700" />
            </button>
            <button
              onClick={() => setShowAttendanceSheet(true)}
              className="rounded-full p-3 bg-gray-300 hover:bg-gray-400 transition"
            >
              <MoreVertical size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
