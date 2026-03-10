import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
        Simple Blog
      </Link>
      <Link
        to="/admin"
        className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
      >
        Admin
      </Link>
    </nav>
  );
}
