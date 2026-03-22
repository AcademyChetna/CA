import React from 'react';

export default function ExperimentCard({ experiment }) {
  const handleClick = () => {
    window.open(experiment.video_url, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-transform transform hover:-translate-y-1"
    >
      <img src={experiment.thumbnail_url} alt={experiment.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{experiment.title}</h3>
      </div>
    </div>
  );
}