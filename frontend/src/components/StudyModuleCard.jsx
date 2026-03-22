import React, { useState } from 'react';
import api from '../api/axios';

export default function StudyModuleCard({ module }) {
  const [likes, setLikes] = useState(module.likes);
  const [liked, setLiked] = useState(false);

  const handleCardClick = () => {
    window.open(module.file_url, '_blank');
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (liked) return;
    try {
      const res = await api.put(`/study-modules/${module.id}/like`);
      setLikes(res.data.likes);
      setLiked(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
    >
      <img src={module.thumbnail_url} alt={module.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{module.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-600 text-sm">📄 PDF</span>
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-sm ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
          >
            ❤️ {likes}
          </button>
        </div>
      </div>
    </div>
  );
}