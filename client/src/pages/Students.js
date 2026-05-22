import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents, deleteStudent } from '../services/api';
import Loading from '../components/Loading';
import Alert from '../components/Alert';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [course, setCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchStudents({ search, course, limit: 20, sortBy: 'createdAt', order: 'desc' });
      setStudents(response.data.students);
    } catch (err) {
      setError('Could not load student list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (err) {
      setError('Failed to delete student');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    loadStudents();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Student Directory</h2>
            <p className="text-sm text-slate-500">Search, filter and manage student profiles.</p>
          </div>
          <Link
            to="/students/add"
            className="inline-flex items-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Add Student
          </Link>
        </div>

        <form onSubmit={handleSearch} className="mt-6 grid gap-4 sm:grid-cols-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, roll or email"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-900 focus:bg-white"
          />
          <input
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Filter by course"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-900 focus:bg-white"
          />
          <button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700">
            Filter
          </button>
        </form>
      </div>

      {error && <Alert message={error} variant="error" />}

      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <table className="min-w-full border-separate border-spacing-0 text-sm text-slate-700">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Roll Number</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    No students available.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="border-t border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.rollNumber}</td>
                    <td className="px-6 py-4">{student.email}</td>
                    <td className="px-6 py-4">{student.course}</td>
                    <td className="px-6 py-4">{student.phone}</td>
                    <td className="px-6 py-4 space-x-2 text-right">
                      <Link
                        to={`/students/edit/${student._id}`}
                        className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Students;
