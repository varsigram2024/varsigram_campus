import { useState } from 'react';
import { Button } from '../components/Button';
import { useSignUp } from '../auth/SignUpContext';

type AcademicDetailsProps = {
  onNext: () => void;
  onBack: () => void;
};

const universities = ['University of Lagos'];

const faculties: Record<string, string[]> = {
  'University of Lagos': ['Arts', 'Science', 'Education', 'Engineering', 'Social Sciences'],
};

const departments: Record<string, string[]> = {
  Arts: ['English', 'History', 'Linguistics'],
  Science: ['Computer Science', 'Mathematics', 'Physics'],
  Education: ['Educational Administration', 'Guidance and Counselling'],
  Engineering: ['Civil Engineering', 'Electrical Engineering', 'Mechanical Engineering'],
  'Social Sciences': ['Economics', 'Sociology', 'Political Science'],
};

export const AcademicDetails = ({ onNext, onBack }: AcademicDetailsProps) => {
  const { updateSignUpData } = useSignUp();
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');

  const availableFaculties = university ? faculties[university] ?? [] : [];
  const availableDepartments = faculty ? departments[faculty] ?? [] : [];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateSignUpData({ university, faculty, department });
    onNext();
  };

  return (
    <div className="mx-auto max-w-[520px] rounded-[2rem] bg-white px-6 py-8 shadow-xl shadow-slate-900/5 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Academic Details</h1>
      <p className="mt-3 text-sm text-slate-600">Tell us about your academic background</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">University</span>
          <select
            value={university}
            onChange={(event) => {
              setUniversity(event.target.value);
              setFaculty('');
              setDepartment('');
            }}
            className="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-[#750015] focus:ring-4 focus:ring-[#750015]/10"
          >
            <option value="">Select your university</option>
            {universities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Faculty</span>
          <select
            value={faculty}
            onChange={(event) => {
              setFaculty(event.target.value);
              setDepartment('');
            }}
            className="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-[#750015] focus:ring-4 focus:ring-[#750015]/10"
            disabled={!university}
          >
            <option value="">Select faculty</option>
            {availableFaculties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Department</span>
          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-[#750015] focus:ring-4 focus:ring-[#750015]/10"
            disabled={!faculty}
          >
            <option value="">Select department</option>
            {availableDepartments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" className="flex-1" disabled={!department}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};