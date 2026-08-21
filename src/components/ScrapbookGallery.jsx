import React, { useState } from 'react';
import { Camera, Play, Sparkles } from 'lucide-react';

export const ScrapbookGallery = ({ gallery, onImageClick }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const isVideoItem = (item) => {
    if (!item) return false;
    if (item.type === 'video' || item.category === 'videos') return true;
    const url = typeof item === 'string' ? item : item.image;
    return typeof url === 'string' && (
      url.toLowerCase().endsWith('.mp4') ||
      url.toLowerCase().endsWith('.webm') ||
      url.toLowerCase().endsWith('.mov')
    );
  };

  const filteredItems =
    activeFilter === 'all'
      ? gallery
      : activeFilter === 'videos'
      ? gallery.filter((item) => isVideoItem(item))
      : activeFilter === 'photos'
      ? gallery.filter((item) => !isVideoItem(item))
      : gallery.filter((item) => item.category === activeFilter);

  const videoCount = gallery.filter((i) => isVideoItem(i)).length;
  const photoCount = gallery.filter((i) => !isVideoItem(i)).length;

  return (
    <section id="gallery" className="section-container">
      <div className="section-header">
        <div className="section-tag">
          <Camera size={16} />
          <span>Captured Moments</span>
        </div>
        <h2 className="section-title">Our Memory Scrapbook</h2>
        <p className="section-desc">
          Snapshots and video clips of our favorite smiles, laughs, and unforgettable moments together.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="gallery-filters">
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Memories ({gallery.length})
        </button>
        {videoCount > 0 && (
          <button
            className={`filter-btn ${activeFilter === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveFilter('videos')}
          >
            Videos 🎥 ({videoCount})
          </button>
        )}
        <button
          className={`filter-btn ${activeFilter === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveFilter('photos')}
        >
          Photos 📸 ({photoCount})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveFilter('favorites')}
        >
          Favorites ⭐
        </button>
      </div>

      {/* Polaroid Grid */}
      <div className="gallery-polaroid-grid">
        {filteredItems.map((item, idx) => {
          const isVideo = isVideoItem(item);
          return (
            <div
              key={item.id || item.image || idx}
              className={`polaroid-card ${isVideo ? 'polaroid-video-card' : ''}`}
              onClick={() => onImageClick(item.image, item.caption, isVideo)}
              title={isVideo ? 'Click to play video memory' : 'Click to zoom memory'}
            >
              <div className="polaroid-tape"></div>
              <div className="polaroid-img-box">
                {isVideo ? (
                  <div className="video-thumb-wrapper">
                    <video
                      src={item.image}
                      muted
                      playsInline
                      preload="metadata"
                      className="polaroid-video-preview"
                    />
                    <div className="video-play-overlay">
                      <div className="play-pulse-btn">
                        <Play size={24} fill="currentColor" />
                      </div>
                      <span className="video-pill-tag">Play Video</span>
                    </div>
                  </div>
                ) : (
                  <img src={item.image} alt={item.caption || 'Anniversary Memory'} loading="lazy" />
                )}
              </div>
              <p className="polaroid-caption">{item.caption}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
