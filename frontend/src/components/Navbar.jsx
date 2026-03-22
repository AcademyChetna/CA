import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">Chetna Academy</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
          {user && (
            <Link to="/admin" className="hover:text-yellow-300 transition">Admin</Link>
          )}
        </div>
      </div>
    </nav>
  );
}