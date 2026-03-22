import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    thumbnail_url: '',
    thumbnail_file_id: '',
    price: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
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
    if (!form.title || !form.thumbnail_url || !form.price) {
      alert('Please fill all fields and upload a thumbnail');
      return;
    }
    if (editingId) {
      await api.put(`/products/${editingId}`, form);
    } else {
      await api.post('/products', form);
    }
    setForm({ title: '', thumbnail_url: '', thumbnail_file_id: '', price: '' });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (prod) => {
    setForm({
      title: prod.title,
      thumbnail_url: prod.thumbnail_url,
      thumbnail_file_id: prod.thumbnail_file_id,
      price: prod.price,
    });
    setEditingId(prod.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This will also delete the thumbnail from ImageKit.')) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

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
          <label className="block text-sm font-medium mb-1">Price (in ₹)</label>
          <input
            type="text"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
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
              setForm({ title: '', thumbnail_url: '', thumbnail_file_id: '', price: '' });
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="bg-white rounded shadow overflow-hidden">
        {products.map((prod) => (
          <div key={prod.id} className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={prod.thumbnail_url} alt="" className="h-12 w-12 object-cover rounded" />
              <div>
                <div className="font-medium">{prod.title}</div>
                <div className="text-sm text-gray-600">₹{prod.price}</div>
              </div>
            </div>
            <div>
              <button onClick={() => handleEdit(prod)} className="text-blue-600 mr-2">Edit</button>
              <button onClick={() => handleDelete(prod.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}