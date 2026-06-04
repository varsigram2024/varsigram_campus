import { useEffect, useState } from 'react';
import { SignUpProvider } from './auth/SignUpContext';
import { Welcome } from './pages/Welcome';
import { CreateWorkspace } from './pages/CreateWorkspace';
import { MultiStepSignUp } from './pages/MultiStepSignUp';
import { Login } from './pages/Login';
import { SuggestedRooms } from './pages/SuggestedRooms';
import { JoinWithCode } from './pages/JoinWithCode';
import { Campus } from './pages/campus/campus';
import { Faculty } from './pages/campus/faculty';
import { Department } from './pages/campus/department';
import { LibraryIndex } from './pages/campus/library/index';
import { LibraryFolders } from './pages/campus/library/folders';
import { Classroom } from './pages/campus/classroom/index';
import { LectureRoom } from './pages/campus/classroom/lecture';
import { BottomNav } from './components/BottomNav';
import { AIChat } from './pages/AIChat';
import { RoomsIndex, type CourseRoom } from './pages/rooms';
import { RoomChat } from './pages/rooms/chat';
import { RoomTest } from './pages/rooms/test';
import TestQuestions from './pages/rooms/test-questions';
import { CampusSidebar } from './components/CampusSidebar';

type CampusPage = 'campus' | 'faculty' | 'department';
type BottomSection = 'campus' | 'rooms';
type View =
  | 'welcome'
    | 'create-workspace'
  | 'signup'
  | 'login'
  | 'suggested-rooms'
  | 'join-with-code'
  | 'campus'
  | 'library'
  | 'library-folders'
  | 'classroom'
  | 'classroom-lecture'
  | 'rooms'
  | 'room-chat'
  | 'room-test'
  | 'room-test-questions'
  | 'ai-chat';

const ROOMS_STORAGE_KEY = 'varsigram-campus-course-rooms';

const defaultRooms: CourseRoom[] = [
  {
    id: 'ecn451',
    name: 'ECN 451 - Advanced Macro-economics',
    lastMessage: 'Dr Shittu Ayodele: Hello everyone, the CA test is coming up on 25th May.',
    unreadCount: 3,
    memberCount: 800,
  },
  {
    id: 'mth204',
    name: 'MTH 204 - Linear Algebra',
    lastMessage: 'Assignment 2 has been uploaded.',
    unreadCount: 0,
    memberCount: 412,
  },
  {
    id: 'csc302',
    name: 'CSC 302 - Database Systems',
    lastMessage: 'Practical session starts by 2pm.',
    unreadCount: 1,
    memberCount: 236,
  },
];

const getCampusPageFromPath = (pathname: string): CampusPage => {
  if (pathname.includes('/campus/faculty')) return 'faculty';
  if (pathname.includes('/campus/department')) return 'department';
  return 'campus';
};

const getViewFromPath = (pathname: string): View => {
  if (pathname.includes('/ai-chat')) return 'ai-chat';
    if (pathname.includes('/create-workspace')) return 'create-workspace';
  if (pathname.includes('/campus/classroom/lecture')) return 'classroom-lecture';
  if (pathname.includes('/campus/classroom')) return 'classroom';
  if (pathname.includes('/campus/library/folders')) return 'library-folders';
  if (pathname.includes('/campus/library')) return 'library';
  if (pathname.includes('/rooms/test-questions')) return 'room-test-questions';
  if (pathname.includes('/rooms/test')) return 'room-test';
  if (pathname.includes('/rooms/chat')) return 'room-chat';
  if (pathname.includes('/rooms')) return 'rooms';
  if (pathname.includes('/campus')) return 'campus';
  if (pathname.includes('/join-with-code')) return 'join-with-code';
  if (pathname.includes('/suggested-rooms')) return 'suggested-rooms';
  if (pathname.includes('/signup')) return 'signup';
  if (pathname.includes('/login')) return 'login';
  return 'welcome';
};

const getBottomSectionFromView = (view: View): BottomSection | null => {
  if (view === 'rooms' || view === 'room-chat' || view === 'room-test' || view === 'room-test-questions') return 'rooms';
  if (view === 'campus' || view === 'library' || view === 'library-folders' || view === 'classroom' || view === 'classroom-lecture') {
    return 'campus';
  }
  return null;
};

function App() {
  const [view, setView] = useState<View>(() => getViewFromPath(window.location.pathname));
  const [campusPage, setCampusPage] = useState<CampusPage>(() => getCampusPageFromPath(window.location.pathname));
  const [rooms, setRooms] = useState<CourseRoom[]>(() => {
    try {
      const stored = window.localStorage.getItem(ROOMS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CourseRoom[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore localStorage errors and use defaults.
    }
    return defaultRooms;
  });

  useEffect(() => {
    const handlePopState = () => {
      setView(getViewFromPath(window.location.pathname));
      setCampusPage(getCampusPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(rooms));
  }, [rooms]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setView(getViewFromPath(path));
  };

  const openRoom = (roomId: string) => {
    navigate(`/rooms/chat?room=${roomId}`);
  };

  const activeRoomId = new URLSearchParams(window.location.search).get('room');
  const activeRoom = rooms.find((room) => room.id === activeRoomId) ?? rooms[0];

  const addRoom = (name: string) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `room-${Date.now()}`;
    setRooms((current) => [
      {
        id: `${id}-${Date.now()}`,
        name,
        lastMessage: 'No messages yet. Say hello to start the conversation.',
        unreadCount: 0,
        memberCount: 0,
      },
      ...current,
    ]);
  };

  const bottomSection = getBottomSectionFromView(view);

  const content = (() => {
    switch (view) {
      case 'signup':
        return (
          <MultiStepSignUp
            onExitToWelcome={() => navigate('/welcome')}
            onLogin={() => navigate('/login')}
            onComplete={() => navigate('/suggested-rooms')}
          />
        );
      case 'login':
        return (
          <Login
            onBackToWelcome={() => navigate('/welcome')}
            onSignUp={() => navigate('/signup')}
            onLoginSuccess={() => navigate('/suggested-rooms')}
          />
        );
      case 'suggested-rooms':
        return (
          <SuggestedRooms
            onBackToWelcome={() => navigate('/welcome')}
            onJoinWithCode={() => navigate('/join-with-code')}
          />
        );
      case 'join-with-code':
        return (
          <JoinWithCode
            onBack={() => navigate('/suggested-rooms')}
            onJoinSuccess={(code) => {
              alert(`Successfully joined room with code: ${code}`);
              navigate('/campus');
            }}
          />
        );
      case 'library':
        return (
          <div className="flex">
            <CampusSidebar
              currentPage={campusPage}
              onPageChange={(page) => {
                setCampusPage(page);
                navigate(`/campus/${page === 'campus' ? '' : page}`);
              }}
              onAIChatClick={() => navigate('/ai-chat')}
            />
            <div className="flex-1"><LibraryIndex /></div>
          </div>
        );
      case 'library-folders':
        return (
          <div className="flex">
            <CampusSidebar
              currentPage={campusPage}
              onPageChange={(page) => {
                setCampusPage(page);
                navigate(`/campus/${page === 'campus' ? '' : page}`);
              }}
              onAIChatClick={() => navigate('/ai-chat')}
            />
            <div className="flex-1"><LibraryFolders /></div>
          </div>
        );
      case 'classroom':
        return (
          <div className="flex">
            <CampusSidebar
              currentPage={campusPage}
              onPageChange={(page) => {
                setCampusPage(page);
                navigate(`/campus/${page === 'campus' ? '' : page}`);
              }}
              onAIChatClick={() => navigate('/ai-chat')}
            />
            <div className="flex-1"><Classroom /></div>
          </div>
        );
      case 'classroom-lecture':
        return (
          <div className="flex">
            <CampusSidebar
              currentPage={campusPage}
              onPageChange={(page) => {
                setCampusPage(page);
                navigate(`/campus/${page === 'campus' ? '' : page}`);
              }}
              onAIChatClick={() => navigate('/ai-chat')}
            />
            <div className="flex-1"><LectureRoom /></div>
          </div>
        );
      case 'campus':
        return (
          <div className="flex">
            <CampusSidebar
              currentPage={campusPage}
              onPageChange={(page) => {
                setCampusPage(page);
                navigate(`/campus/${page === 'campus' ? '' : page}`);
              }}
              onAIChatClick={() => navigate('/ai-chat')}
            />
            <div className="flex-1">
              {campusPage === 'campus' && <Campus />}
              {campusPage === 'faculty' && <Faculty />}
              {campusPage === 'department' && <Department />}
            </div>
          </div>
        );
      case 'rooms':
        return (
          <RoomsIndex
            rooms={rooms}
            onCreateRoom={addRoom}
            onOpenRoom={openRoom}
          />
        );
      case 'room-chat':
        return (
          <RoomChat
            room={activeRoom}
            onBack={() => navigate('/rooms')}
            onOpenTest={() => navigate('/rooms/test')}
            onOpenVirtualClassroom={() => navigate('/campus/classroom')}
            onOpenLibrary={() => navigate('/campus/library')}
          />
        );
      case 'room-test':
        return <RoomTest onBack={() => navigate('/rooms')} />;
      case 'room-test-questions':
        return <TestQuestions />;
      case 'ai-chat':
        return <AIChat />;
            case 'create-workspace':
              return (
                <CreateWorkspace
                  onBack={() => navigate('/welcome')}
                  onCreateSuccess={() => {
                    alert('Workspace created successfully!');
                    navigate('/suggested-rooms');
                  }}
                />
              );
      case 'welcome':
      default:
        return <Welcome onGetStarted={() => navigate('/create-workspace')} onLogin={() => navigate('/login')} />;
    }
  })();

  return (
    <SignUpProvider>
      <div className="flex min-h-dvh flex-col">
        <main className="flex-1">{content}</main>
        {bottomSection && (
          <footer className="shrink-0 sticky bottom-0">
            <BottomNav
              activeSection={bottomSection}
              onNavigate={(section) => {
                navigate(section === 'campus' ? '/campus' : '/rooms');
              }}
            />
          </footer>
        )}
      </div>
    </SignUpProvider>
  );
}

export default App;