import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function ManageStudyModules() {
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState({
    title: '',
    thumbnail_url: '',
    thumbnail_file_id: '',
    file_url: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const res = await api.get('/study-modules');
    setModules(res.data);
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
    if (!form.title || !form.thumbnail_url || !form.file_url) {
      alert('Please fill all fields and upload a thumbnail');
      return;
    }
    if (editingId) {
      await api.put(`/study-modules/${editingId}`, form);
    } else {
      await api.post('/study-modules', form);
    }
    setForm({
      title: '',
      thumbnail_url: '',
      thumbnail_file_id: '',
      file_url: '',
    });
    setEditingId(null);
    fetchModules();
  };

  const handleEdit = (mod) => {
    setForm({
      title: mod.title,
      thumbnail_url: mod.thumbnail_url,
      thumbnail_file_id: mod.thumbnail_file_id,
      file_url: mod.file_url,
    });
    setEditingId(mod.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This will also delete the thumbnail from ImageKit.')) {
      await api.delete(`/study-modules/${id}`);
      fetchModules();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Study Modules</h1>

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
          <label className="block text-sm font-medium mb-1">PDF File URL (Google Drive / ImageKit)</label>
          <input
            type="url"
            value={form.file_url}
            onChange={(e) => setForm({ ...form, file_url: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload PDF to ImageKit or Google Drive and paste the public link
          </p>
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
              setForm({
                title: '',
                thumbnail_url: '',
                thumbnail_file_id: '',
                file_url: '',
              });
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="bg-white rounded shadow overflow-hidden">
        {modules.map((mod) => (
          <div key={mod.id} className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={mod.thumbnail_url} alt="" className="h-12 w-12 object-cover rounded" />
              <span className="font-medium">{mod.title}</span>
            </div>
            <div>
              <button onClick={() => handleEdit(mod)} className="text-blue-600 mr-2">
                Edit
              </button>
              <button onClick={() => handleDelete(mod.id)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}