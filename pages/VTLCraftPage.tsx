
import React, { useState, useEffect } from 'react';
import { GalleryImage } from '../types';
import { api } from '../services/api';

const VTLCraftPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await api.getGalleryImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) return <div className="text-center p-10">Loading gallery...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-vt-dark-gray mb-2">VTL Craft</h1>
      <p className="text-vt-gray mb-6">A showcase of our passion for interior design, where technology meets aesthetics.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={image.id} className={`group relative overflow-hidden rounded-lg shadow-lg ${index % 4 === 0 || index % 4 === 3 ? 'md:col-span-2' : ''}`}>
            <img 
              src={image.imageUrl} 
              alt={image.title || `Gallery image ${image.id}`}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
            {image.title && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                <h3 className="text-white p-4 text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.title}
                </h3>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VTLCraftPage;
