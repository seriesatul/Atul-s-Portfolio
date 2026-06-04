import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

// Library Collection (utilizing your physical graphic assets)
const initialLibrary = [
  { id: 'pic1', title: 'Workspace Desk Setup', src: '/images/gal1.png', category: 'library' },
  { id: 'pic2', title: 'Creative Wireframes', src: '/images/gal2.png', category: 'library' },
  { id: 'pic3', title: 'Code Compilation', src: '/images/gal3.png', category: 'library' },
  { id: 'pic4', title: 'UI/UX Design Mockups', src: '/images/gal4.png', category: 'library' },
  { id: 'pic5', title: 'Developer Profile Portrait', src: '/images/adrian.jpg', category: 'personal' },
  { id: 'pic6', title: 'Interactive Prototype Specs', src: '/images/adrian-2.jpg', category: 'personal' },
  { id: 'pic7', title: 'Frontend Layout Prototypes', src: '/images/blog1.png', category: 'projects' },
  { id: 'pic8', title: 'Responsive Asset Assets', src: '/images/blog2.png', category: 'projects' },
  { id: 'pic9', title: 'System Architecture Diagram', src: '/images/blog3.png', category: 'projects' },
];

export default function PhotosApp() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState(['pic1', 'pic4']); // Default mock favorites
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const lightboxRef = useRef(null);

  // GSAP animation when full-screen lightbox is triggered
  useEffect(() => {
    if (selectedPhoto && lightboxRef.current) {
      gsap.fromTo(
        lightboxRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [selectedPhoto]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation(); // Prevents launching the lightbox when clicking the favorite heart
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Filter gallery list dynamically based on active sidebar tab
  const getFilteredPhotos = () => {
    if (activeCategory === 'all') return initialLibrary;
    if (activeCategory === 'favorites') return initialLibrary.filter(p => favorites.includes(p.id));
    return initialLibrary.filter(p => p.category === activeCategory);
  };

  const filteredPhotos = getFilteredPhotos();

  return (
    <div className="flex h-full bg-white select-none overflow-hidden relative">
      
      {/* Dynamic inline styles to completely hide vertical scrollbars inside the photo grid */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />

      {/* 1. Left Side: Frosted sidebar navigation */}
      <div className="w-44 bg-gray-50/80 border-r border-gray-200/50 p-3 flex flex-col gap-4 shrink-0">
        <div>
          <h4 className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 px-2">PHOTOS</h4>
          <ul className="flex flex-col gap-0.5 text-xs text-gray-700 font-medium">
            {[
              { id: 'all', label: 'All Photos', icon: '🖼️' },
              { id: 'favorites', label: 'Favorites', icon: '❤️' },
              { id: 'projects', label: 'Projects', icon: '💻' },
              { id: 'personal', label: 'Personal', icon: '👤' },
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveCategory(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    activeCategory === tab.id 
                      ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm' 
                      : 'hover:bg-gray-200/40'
                  }`}
                >
                  <span className="truncate">{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. Right Side: Dynamic Photos Grid */}
      <div className="flex-1 p-5 overflow-y-auto no-scrollbar bg-white">
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer group bg-gray-50"
              >
                <img 
                  src={photo.src} 
                  alt={photo.title} 
                  className="size-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                
                {/* Image Overlay on Hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 text-white">
                  <span className="text-[10px] font-semibold truncate max-w-[70%]">{photo.title}</span>
                  
                  {/* Heart/Favorite toggle inside the hover layer */}
                  <button 
                    onClick={(e) => toggleFavorite(e, photo.id)}
                    className="p-1 rounded-full hover:bg-white/20 active:scale-95 transition-transform"
                  >

                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-xs text-gray-400">
            <span>No Photos Selected</span>
          </div>
        )}
      </div>

      {/* ==========================================
          3. FULL-SCREEN LIGHTBOX OVERLAY (GSAP)
          ========================================== */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="absolute inset-0 bg-black/95 z-[99999] flex flex-col items-center justify-center p-4 cursor-zoom-out"
        >
          <div 
            ref={lightboxRef}
            onClick={(e) => e.stopPropagation()} // Prevents closing lightbox when clicking image
            className="relative max-w-3xl max-h-[80%] flex flex-col items-center gap-4 cursor-default"
          >
            {/* Overlay Close Button */}
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-xs font-semibold border border-white/10 cursor-pointer"
            >
              Close Preview
            </button>

            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.title} 
              className="max-w-full max-h-full rounded-xl object-contain border border-white/5 shadow-2xl"
            />
            
            <div className="flex items-center gap-4 text-white">
              <span className="text-xs font-semibold tracking-wide">{selectedPhoto.title}</span>
              <button 
                onClick={(e) => toggleFavorite(e, selectedPhoto.id)}
                className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 active:scale-95 transition-all"
              >
                {favorites.includes(selectedPhoto.id) ? 'Favorite' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}