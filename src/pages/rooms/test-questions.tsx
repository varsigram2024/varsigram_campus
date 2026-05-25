import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components/Button';

const questions = [
  {
    id: 1,
    title: 'Question 1',
    text: 'Who is the FATHER OF ECONOMICS?',
    options: ['Adam Smith', 'David Ricardo', 'Alfred Marshall', 'Lionel Robbins'],
    correctIndex: 0,
  },
  {
    id: 2,
    title: 'Question 2',
    text: 'What is the primary focus of microeconomics?',
    options: ['National income', 'Individual consumers and firms', 'International trade', 'Inflation rates'],
    correctIndex: 1,
  },
  {
    id: 3,
    title: 'Question 3',
    text: 'Which economist is associated with comparative advantage?',
    options: ['Adam Smith', 'David Ricardo', 'John Maynard Keynes', 'Milton Friedman'],
    correctIndex: 1,
  },
  {
    id: 4,
    title: 'Question 4',
    text: 'What does GDP stand for?',
    options: ['Gross Domestic Product', 'General Domestic Price', 'Global Development Plan', 'Gross Demand Pattern'],
    correctIndex: 0,
  },
  {
    id: 5,
    title: 'Question 5',
    text: 'Demand usually decreases when price increases, according to which law?',
    options: ['Law of Utility', 'Law of Supply', 'Law of Demand', 'Law of Diminishing Returns'],
    correctIndex: 2,
  },
  {
    id: 6,
    title: 'Question 6',
    text: 'Who developed the concept of the invisible hand?',
    options: ['Alfred Marshall', 'Karl Marx', 'Adam Smith', 'John Stuart Mill'],
    correctIndex: 2,
  },
  {
    id: 7,
    title: 'Question 7',
    text: 'A market structure with many buyers and sellers is called?',
    options: ['Monopoly', 'Perfect competition', 'Oligopoly', 'Monopsony'],
    correctIndex: 1,
  },
  {
    id: 8,
    title: 'Question 8',
    text: 'Inflation is best defined as:',
    options: ['A fall in output', 'A rise in general price levels', 'A rise in employment', 'A fall in interest rates'],
    correctIndex: 1,
  },
  {
    id: 9,
    title: 'Question 9',
    text: 'Which branch of economics studies the whole economy?',
    options: ['Behavioral economics', 'Microeconomics', 'Macroeconomics', 'Managerial economics'],
    correctIndex: 2,
  },
  {
    id: 10,
    title: 'Question 10',
    text: 'Opportunity cost is the:',
    options: ['Total amount spent', 'Value of the next best alternative forgone', 'Cost of production only', 'Market selling price'],
    correctIndex: 1,
  },
  {
    id: 11,
    title: 'Question 11',
    text: 'Who is known for the General Theory of Employment, Interest and Money?',
    options: ['David Ricardo', 'Thomas Malthus', 'John Maynard Keynes', 'Friedrich Hayek'],
    correctIndex: 2,
  },
  {
    id: 12,
    title: 'Question 12',
    text: 'When supply exceeds demand, price tends to:',
    options: ['Increase', 'Remain fixed', 'Decrease', 'Double'],
    correctIndex: 2,
  },
  {
    id: 13,
    title: 'Question 13',
    text: 'The central problem of economics is:',
    options: ['Inflation', 'Unemployment', 'Scarcity', 'Population growth'],
    correctIndex: 2,
  },
  {
    id: 14,
    title: 'Question 14',
    text: 'Which of the following is a fiscal policy tool?',
    options: ['Changing tax rates', 'Changing reserve ratio', 'Open market operations', 'Changing discount rate'],
    correctIndex: 0,
  },
  {
    id: 15,
    title: 'Question 15',
    text: 'A situation where one seller controls the market is called:',
    options: ['Oligopoly', 'Duopoly', 'Monopoly', 'Perfect competition'],
    correctIndex: 2,
  },
];

export const TestQuestions = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const q = questions[current];
  const progress = Math.round(((current + 1) / questions.length) * 100);

  const handleSelect = (index: number) => {
    if (showResult) return; // lock selection after result is shown
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowResult(true);
  };

  const handleNext = () => {
    const next = Math.min(current + 1, questions.length - 1);
    setCurrent(next);
    setSelected(null);
    setShowResult(false);
  };

  const handlePrev = () => {
    const prev = Math.max(current - 1, 0);
    setCurrent(prev);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-medium">Test Questions</h1>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 bg-[#750015] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-2">{current + 1} of {questions.length}</div>
        </div>

        {/* Question Card */}
        <div className="mb-6">
          <div className="relative bg-pink-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-center text-sm text-[#750015] mb-2">
              <span className="mx-3">—</span>
              <span className="font-semibold">{q.title}</span>
              <span className="mx-3">—</span>
            </div>

            <div className="text-center mt-2 mb-6">
              <h2 className="text-lg font-bold text-gray-900">{q.text}</h2>
            </div>

            {/* Decorative stacked shapes */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
              <div className="w-56 h-10 bg-pink-200 rounded-b-3xl -mb-4 opacity-90"></div>
              <div className="w-48 h-10 bg-pink-300 rounded-b-3xl -mb-4 opacity-80"></div>
              <div className="w-40 h-10 bg-pink-400 rounded-b-3xl -mb-4 opacity-70"></div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {q.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isCorrect = q.correctIndex === idx;
            const showCheck = showResult && isCorrect;
            const showX = showResult && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`flex items-center gap-3 w-full text-left rounded-lg px-4 py-3 transition ${
                  showResult
                    ? isCorrect
                      ? 'bg-green-50 text-gray-900'
                      : isSelected
                        ? 'bg-red-50 text-gray-500 line-through'
                        : 'bg-white text-gray-500'
                    : isSelected
                      ? 'bg-[#fff3f4] border border-[#f5c2c7] text-gray-900'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                disabled={showResult}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-[#750015] border-[#750015]' : 'border-gray-300'}`}>
                  {isSelected && !showResult && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="flex-1">
                  <span className={`text-sm font-medium`}>{opt}</span>
                </div>

                <div className="w-6">
                  {showCheck && <CheckCircle size={18} className="text-green-500" />}
                  {showX && <XCircle size={18} className="text-red-500" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handlePrev} disabled={current === 0}>
            Previous
          </Button>

          {!showResult && (
            <Button fullWidth onClick={handleSubmit} disabled={selected === null}>
              Submit
            </Button>
          )}

          {showResult && (
            <Button fullWidth onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestQuestions;
