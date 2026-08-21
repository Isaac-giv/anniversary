import React from 'react';

export const LightboxModal = ({ image, caption, isVideo, onClose }) => {
  if (!image) return null;

  const checkIsVideo =
    isVideo ||
    (typeof image === 'string' &&
      (image.toLowerCase().endsWith('.mp4') ||
        image.toLowerCase().endsWith('.webm') ||
        image.toLowerCase().endsWith('.mov')));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Lightbox">
          &times;
        </button>

        {checkIsVideo ? (
          <video
            src={image}
            controls
            autoPlay
            playsInline
            className="lightbox-video"
          />
        ) : (
          <img src={image} alt="Enlarged Memory" className="lightbox-img" />
        )}

        {caption && <div className="lightbox-caption">{caption}</div>}
      </div>
    </div>
  );
};
