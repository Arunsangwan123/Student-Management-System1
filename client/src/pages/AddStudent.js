import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../services/api';
import Alert from '../components/Alert';

const AddStudent = () => {
  const [form, setForm] = useState({
    name: '',
    rollNumber: '',
    email: '',
    course: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await createStudent(form);
      setSuccess('Student created successfully');
      navigate('/students');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Add New Student</h2>
      <p className="mt-1 text-sm text-slate-500">Fill the details below to add a new student profile.</p>

      {error && <Alert message={error} variant="error" />}
      {success && <Alert message={success} variant="success" />}

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        {['name', 'rollNumber', 'email', 'course', 'phone', 'address'].map((field) => (
          <div key={field} className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">{field === 'rollNumber' ? 'Roll Number' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-900 focus:bg-white"
              placeholder={`Enter ${field === 'rollNumber' ? 'roll number' : field}`}
            />
          </div>
        ))}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Save Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
