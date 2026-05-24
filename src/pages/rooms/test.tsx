import { ClipboardList, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../../components/Button';

interface RoomTestProps {
  onBack: () => void;
}

export const RoomTest = ({ onBack }: RoomTestProps) => {
  return (
    <div className="min-h-screen bg-[#f6f2f3] pb-24">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to rooms
        </button>

        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-gray-900/5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#750015]/10 text-[#750015]">
            <ClipboardList size={32} />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#750015]/70">Take a test</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Assessment hub</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            This area can be expanded into timed quizzes, course tests, and practice questions for each room.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { title: 'Timed test', text: 'Start a test with a countdown and auto-submit.' },
              { title: 'Practice mode', text: 'Answer questions without time pressure.' },
              { title: 'Results', text: 'Review scores and explanations after submission.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Sparkles size={16} className="text-[#750015]" />
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Start test</Button>
            <Button variant="outline">View saved tests</Button>
          </div>
        </div>
      </div>
    </div>
  );
};