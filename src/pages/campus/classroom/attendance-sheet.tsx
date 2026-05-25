import { ArrowLeft, Printer } from 'lucide-react';

interface AttendanceRecord {
  no: number;
  name: string;
  faculty: string;
  department: string;
  timeIn: string;
  timeSpent: string;
}

interface AttendanceSheetProps {
  onBack: () => void;
  classroomName?: string;
  classDate?: string;
  classDuration?: string;
  attendanceRecords?: AttendanceRecord[];
}

export const AttendanceSheet = ({
  onBack,
  classroomName = 'Fundamentals of Macro Economics',
  classDate = 'Monday, 23rd of May 2025',
  classDuration = '3pm - 5pm',
  attendanceRecords = [
    { no: 1, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 2, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 3, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 4, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 5, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 6, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 7, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 8, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 9, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 10, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 11, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 12, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 13, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 14, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
    { no: 15, name: 'Mahmud Olaleye', faculty: 'Social Sciences', department: 'Economics', timeIn: '3:00pm', timeSpent: '1:12:40' },
  ],
}: AttendanceSheetProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <Printer size={18} />
            <span className="text-sm font-medium">Print</span>
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance Sheet</h1>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{classroomName}</h2>
        <p className="text-sm text-gray-600">
          {classDate} | {classDuration}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-12">No.</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Faculty | Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time in</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time spent</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{record.no}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-xs font-bold text-orange-700">
                        {record.name.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-900">{record.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {record.faculty} | {record.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.timeIn}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.timeSpent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .sticky {
            position: static;
          }
          button {
            display: none;
          }
          table {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};
