import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Chetna Academy Admin</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="bg-white w-full md:w-64 shadow-sm">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/admin/experiments" className="block p-2 rounded hover:bg-gray-100">🧪 Experiments</Link>
              </li>
              <li>
                <Link to="/admin/study-modules" className="block p-2 rounded hover:bg-gray-100">📚 Study Modules</Link>
              </li>
              <li>
                <Link to="/admin/products" className="block p-2 rounded hover:bg-gray-100">🛒 Products</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}