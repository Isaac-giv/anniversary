import React from 'react';
import { Sparkles } from 'lucide-react';

export const Timeline = ({ timeline, onImageClick }) => {
  return (
    <section id="timeline" className="section-container">
      <div className="section-header">
        <div className="section-tag">
          <Sparkles size={16} />
          <span>Chapter by Chapter</span>
        </div>
        <h2 className="section-title">Our Love Story Timeline</h2>
        <p className="section-desc">
          The unforgettable moments, trips, and milestones that brought us to where we are today.
        </p>
      </div>

      <div className="timeline-wrapper">
        <div className="timeline-line"></div>
        <div className="timeline-items">
          {timeline.map((item) => (
            <div className="timeline-item" key={item.id || item.title}>
              <div className="timeline-marker"></div>
              <div className="timeline-card">
                {item.image && (
                  <div
                    className="timeline-photo-box"
                    onClick={() => onImageClick(item.image, item.title)}
                    title="Click to expand photo"
                  >
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                )}
                <div className="timeline-meta">
                  <span className="timeline-date">{item.date}</span>
                  {item.tag && <span className="timeline-tag">{item.tag}</span>}
                </div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
