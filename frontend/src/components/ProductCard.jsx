import React, { useState } from 'react';
import ProductInquiryModal from './ProductInquiryModal';

export default function ProductCard({ product }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <img src={product.thumbnail_url} alt={product.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{product.title}</h3>
          <p className="text-green-600 font-bold mt-1">₹{product.price}</p>
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Buy Now
          </button>
        </div>
      </div>
      <ProductInquiryModal
        product={product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}