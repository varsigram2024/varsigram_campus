import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/Button';

interface RoomTestProps {
  onBack: () => void;
}

export const RoomTest = ({ onBack }: RoomTestProps) => {
  return (
    <div className="min-h-screen bg-[#ffffff] pb-24">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to rooms
        </button>

        <>
          <div className="text-center mb-12">
            <img src="/test.svg" alt="Join room illustration" className="w-64 h-64 object-contain" />
          </div>

          <div className='text-center'>
            <h1 className="text-xl font-bold text-gray-900 mb-4">Welcome to the Test</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-2xl">
            <div className="bg-white p-2">
              
              
              <Button fullWidth onClick={() => alert('Create Test')}>
                Create Test
              </Button>
            </div>

            <div className="bg-white p-2">
              
              <Button
                fullWidth
                variant="outline"
                onClick={() => {
                  window.history.pushState({}, '', '/rooms/test-questions');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
              >
                Take Test
              </Button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};