import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Dashboard', path: '/' },
  { label: 'Student List', path: '/students' },
  { label: 'Add Student', path: '/students/add' },
];

const Sidebar = () => (
  <aside className="w-full border-b border-slate-200 bg-white lg:w-64 lg:border-r lg:border-b-0">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </aside>
);

export default Sidebar;
