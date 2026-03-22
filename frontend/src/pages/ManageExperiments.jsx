import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function ManageExperiments() {
  const [experiments, setExperiments] = useState([]);
  const [form, setForm] = useState({ title: '', thumbnail_url: '', video_url: '', thumbnail_file_id: '' });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchExperiments();
  }, []);

  const fetchExperiments = async () => {
    const res = await api.get('/experiments');
    setExperiments(res.data);
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    try {
      const res = await api.post('/upload', formData);
      setForm(prev => ({
        ...prev,
        thumbnail_url: res.data.url,
        thumbnail_file_id: res.data.fileId,
      }));
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.thumbnail_url || !form.video_url) {
      alert('Please fill all fields and upload a thumbnail');
      return;
    }
    if (editingId) {
      await api.put(`/experiments/${editingId}`, form);
    } else {
      await api.post('/experiments', form);
    }
    setForm({ title: '', thumbnail_url: '', video_url: '', thumbnail_file_id: '' });
    setEditingId(null);
    fetchExperiments();
  };

  const handleEdit = (exp) => {
    setForm({
      title: exp.title,
      thumbnail_url: exp.thumbnail_url,
      video_url: exp.video_url,
      thumbnail_file_id: exp.thumbnail_file_id,
    });
    setEditingId(exp.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This will also delete the thumbnail from ImageKit.')) {
      await api.delete(`/experiments/${id}`);
      fetchExperiments();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Experiments</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="w-full"
            accept="image/*"
          />
          {form.thumbnail_url && (
            <div className="mt-2">
              <img src={form.thumbnail_url} alt="preview" className="h-20" />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">YouTube Video URL</label>
          <input
            type="url"
            value={form.video_url}
            onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {editingId ? 'Update' : 'Create'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ title: '', thumbnail_url: '', video_url: '', thumbnail_file_id: '' });
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="bg-white rounded shadow overflow-hidden">
        {experiments.map(exp => (
          <div key={exp.id} className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={exp.thumbnail_url} alt="" className="h-12 w-12 object-cover rounded" />
              <span className="font-medium">{exp.title}</span>
            </div>
            <div>
              <button onClick={() => handleEdit(exp)} className="text-blue-600 mr-2">Edit</button>
              <button onClick={() => handleDelete(exp.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}