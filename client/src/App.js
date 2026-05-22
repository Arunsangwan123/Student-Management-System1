import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { isAuthenticated } from './utils/auth';

function App() {
  const location = useLocation();
  const auth = isAuthenticated();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        {auth && <Sidebar />}
        <main className={`flex-1 p-4 lg:p-6 ${auth ? 'lg:ml-0' : 'mx-auto max-w-3xl'}`}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
            <Route path="/students/add" element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
            <Route path="/students/edit/:id" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
