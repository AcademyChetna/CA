import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://wa.me/918960628583"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            WhatsApp
          </a>
          <a
            href="https://www.instagram.com/chetna.academy?igsh=dnlsM3F4bjAycjAw"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/share/17aZ44sTiv/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            Facebook
          </a>
          <a
            href="https://www.youtube.com/@Chetna_xnava"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition"
          >
            YouTube
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Chetna Academy. All rights reserved.</p>
        <p className="text-sm mt-2">A Unit of Xnava Enterprises</p>
      </div>
    </footer>
  );
}