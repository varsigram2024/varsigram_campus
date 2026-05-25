import { Video, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/Button';

type ClassroomView = 'index' | 'create' | 'join';

interface CreateClassroomState {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

const ClassroomIndex = () => {
  const [view, setView] = useState<ClassroomView>('index');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [classroomCode, setClassroomCode] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateClassroomState>({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const handleCreateClassroom = () => {
    if (!formData.title || !formData.startTime || !formData.endTime) {
      alert('Please fill in all fields');
      return;
    }

    // Generate a classroom code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setClassroomCode(code);

    // Navigate to lecture room
    window.history.pushState({}, '', `/campus/classroom/lecture?code=${code}&mode=creator`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleJoinClassroom = (enteredCode: string) => {
    if (!enteredCode) {
      alert('Please enter a classroom code');
      return;
    }

    // Navigate to lecture room
    window.history.pushState({}, '', `/campus/classroom/lecture?code=${enteredCode}&mode=joiner`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-[#ffffff] lg:ml-0 flex flex-col items-center justify-center p-6">
      {view === 'index' && (
        <>
          <div className="text-center mb-12">
            <img src="/rafiki.svg" alt="Join room illustration" className="w-64 h-64 object-contain" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">Welcome to the Classroom</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-2xl">
            <div className="bg-white p-8">
              
              
              <Button fullWidth onClick={() => setShowCreateModal(true)}>
                Create Classroom
              </Button>
            </div>

            <div className="bg-white p-8">
              
              <Button fullWidth variant="outline" onClick={() => setView('join')}>
                Join Classroom
              </Button>
            </div>
          </div>
        </>
      )}

      {view === 'join' && (
        <JoinClassroomForm
          onJoin={handleJoinClassroom}
          onBack={() => setView('index')}
        />
      )}

      {/* Create Classroom Modal */}
      {showCreateModal && (
        <CreateClassroomModal
          formData={formData}
          onFormChange={(field, value) => setFormData({ ...formData, [field]: value })}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateClassroom}
          classroomCode={classroomCode}
          onNavigateToLecture={() => {
            // Already navigated in handleCreateClassroom
          }}
        />
      )}
    </div>
  );
};

interface JoinClassroomFormProps {
  onJoin: (code: string) => void;
  onBack: () => void;
}

const JoinClassroomForm = ({ onJoin, onBack }: JoinClassroomFormProps) => {
  const [code, setCode] = useState('');

  return (
    <div className="w-full max-w-md">
      <button
        onClick={onBack}
        className="mb-6 text-sm text-gray-600 hover:text-gray-900"
      >
        ← Back
      </button>

 <img src="/cuate.svg" alt="Join room illustration" className="w-64 h-64 object-contain" />


      <div className="rounded-lg bg-white p-8 shadow-lg">
       

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Classroom Code</label>
          <input
            type="text"
            placeholder="e.g., ABC123"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#750015] text-lg tracking-widest"
          />
        </div>

        <Button fullWidth onClick={() => onJoin(code)}>
          Join Classroom
        </Button>
      </div>
    </div>
  );
};

interface CreateClassroomModalProps {
  formData: CreateClassroomState;
  onFormChange: (field: keyof CreateClassroomState, value: string) => void;
  onClose: () => void;
  onCreate: () => void;
  classroomCode: string | null;
  onNavigateToLecture: () => void;
}

const CreateClassroomModal = ({
  formData,
  onFormChange,
  onClose,
  onCreate,
  classroomCode,
}: CreateClassroomModalProps) => {
  const [showCode, setShowCode] = useState(false);

  if (showCode && classroomCode) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-end z-50">
        <div className="w-full bg-white rounded-t-2xl p-8 space-y-6 max-h-96 overflow-y-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Classroom Created!</h3>
            <p className="text-gray-600">Share this code with students to join</p>
          </div>

          <div className="bg-[#750015]/10 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Classroom Code</p>
            <p className="text-4xl font-bold text-[#750015] tracking-widest">{classroomCode}</p>
          </div>

          <div className="space-y-3">
            <Button fullWidth onClick={() => {
              navigator.clipboard.writeText(classroomCode);
              alert('Code copied to clipboard!');
            }}>
              Copy Code
            </Button>
            <Button fullWidth variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="w-full bg-white rounded-t-2xl p-8 space-y-4 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Create Classroom</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lecture Title</label>
          <input
            type="text"
            placeholder="e.g., Fundamentals of Macro Economics"
            value={formData.title}
            onChange={(e) => onFormChange('title', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#750015]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => onFormChange('startTime', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#750015]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => onFormChange('endTime', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#750015]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            placeholder="Describe the lecture topic..."
            value={formData.description}
            onChange={(e) => onFormChange('description', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#750015]"
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth onClick={() => {
            onCreate();
            setShowCode(true);
          }}>
            Create Classroom
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Classroom = ClassroomIndex;
