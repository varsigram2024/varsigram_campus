import { useState } from 'react';
import { Button } from '../Button';

interface AttendanceSignInModalProps {
  classroomCode: string;
  classroomName: string;
  onClose: () => void;
  onConfirm: (name: string, matricNumber: string) => void;
}

export const AttendanceSignInModal = ({
  classroomCode,
  classroomName,
  onClose,
  onConfirm,
}: AttendanceSignInModalProps) => {
  const [name, setName] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !matricNumber.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      onConfirm(name, matricNumber);
    } catch (error) {
      alert('Error signing in to attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="w-full bg-white rounded-t-2xl p-8 space-y-6 max-h-96 overflow-y-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Sign In Attendance</h3>
          <p className="text-gray-600 text-sm mb-1">{classroomName}</p>
          <p className="text-gray-500 text-xs">Code: {classroomCode}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"></label>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#750015]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"></label>
            <input
              type="text"
              placeholder="Matric number"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#750015]"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            fullWidth
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>
      </div>
    </div>
  );
};
