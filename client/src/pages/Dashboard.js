import { useEffect, useState } from 'react';
import { fetchStudents } from '../services/api';
import Loading from '../components/Loading';
import Alert from '../components/Alert';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchStudents({ limit: 5, sortBy: 'createdAt', order: 'desc' });
        setStudents(response.data.students);
        setTotalCount(response.data.total || 0);
      } catch (err) {
        setError('Unable to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition duration-300">
          <p className="text-sm font-medium tracking-[0.1em] text-slate-400">Total Students</p>
          <h2 className="mt-4 text-4xl font-bold text-slate-900">{totalCount}</h2>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition duration-300">
          <p className="text-sm font-medium tracking-[0.1em] text-slate-400">Recently Added</p>
          <h2 className="mt-4 text-2xl font-bold text-slate-900 truncate">{students[0]?.name ?? '—'}</h2>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition duration-300">
          <p className="text-sm font-medium tracking-[0.1em] text-slate-400">Latest Sync</p>
          <h2 className="mt-4 text-2xl font-semibold text-emerald-600">Active</h2>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Recent Student Records</h3>
            <p className="text-sm text-slate-500">Monitor the newest student entries in your system.</p>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <Alert message={error} variant="error" />
        ) : (
          <div className="space-y-4">
            {students.length === 0 ? (
              <p className="text-sm text-slate-500">No students found yet.</p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {students.map((student) => (
                  <div key={student._id} className="rounded-3xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">{new Date(student.createdAt).toLocaleDateString()}</p>
                    <h4 className="mt-2 text-lg font-semibold text-slate-900">{student.name}</h4>
                    <p className="mt-1 text-sm text-slate-600">{student.course} · {student.rollNumber}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
