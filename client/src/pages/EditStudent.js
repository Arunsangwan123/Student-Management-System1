import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudent, updateStudent } from '../services/api';
import Alert from '../components/Alert';
import Loading from '../components/Loading';

const EditStudent = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    rollNumber: '',
    email: '',
    course: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const response = await getStudent(id);
        setForm(response.data);
      } catch (err) {
        setError('Unable to load student details');
      } finally {
        setLoading(false);
      }
    };
    loadStudent();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateStudent(id, form);
      navigate('/students');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading label="Loading student profile..." />;
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Edit Student</h2>
      <p className="mt-1 text-sm text-slate-500">Update records and save changes for the selected student.</p>

      {error && <Alert message={error} variant="error" />}

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        {['name', 'rollNumber', 'email', 'course', 'phone', 'address'].map((field) => (
          <div key={field} className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">{field === 'rollNumber' ? 'Roll Number' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              name={field}
              value={form[field] || ''}
              onChange={handleChange}
              required
              type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-900 focus:bg-white"
            />
          </div>
        ))}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
          >
            {saving ? 'Updating...' : 'Update Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
