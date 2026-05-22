import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, removeToken } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Student Management System</h1>
          <p className="text-sm text-slate-500">Admin panel for managing student records</p>
        </div>
        {authenticated && (
          <button
            onClick={handleLogout}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
