import React, { useState } from 'react';
import api from '../api/axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });
    try {
      await api.post('/contact', form);
      setStatus({ type: 'success', text: 'Message sent successfully! We will get back to you soon.' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Get in Touch</h1>
          <p className="text-gray-600 mb-6">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700">+91 8960628583, </span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700">chetna.xnava@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-700">Near Amity University, Malhaur, Lucknow-U.P 226010</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {status.text && (
              <div className={`mt-2 p-2 rounded text-center text-sm ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {status.text}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
        <div className="flex justify-center space-x-6">
          <a href="https://wa.me/918960628583" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">WhatsApp</a>
          <a href="https://www.instagram.com/chetna.academy?igsh=dnlsM3F4bjAycjAw" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Instagram</a>
          <a href="https://www.facebook.com/share/17aZ44sTiv/" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">Facebook</a>
          <a href="https://www.youtube.com/@Chetna_xnava" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">YouTube</a>
        </div>
      </div>
    </div>
  );
}