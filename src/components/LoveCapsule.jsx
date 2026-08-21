import React, { useState } from 'react';
import { HeartHandshake, Heart, Sparkles, List } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoveCapsule = ({ reasons }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const drawNextReason = () => {
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % reasons.length);
    setTimeout(() => setIsAnimating(false), 400);

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#f5d77f']
    });
  };

  return (
    <section id="reasons" className="section-container">
      <div className="section-header">
        <div className="section-tag">
          <HeartHandshake size={16} />
          <span>From The Heart</span>
        </div>
        <h2 className="section-title">Reasons Why I Love You</h2>
        <p className="section-desc">
          A little capsule of the million reasons you make my world so wonderful.
        </p>
      </div>

      <div className="reasons-showcase">
        <div className="reason-jar-card">
          <div className="jar-icon-glow">
            <Heart className="jar-heart-svg" size={36} />
          </div>

          <div className={`current-reason-card ${isAnimating ? 'pop-animate' : ''}`}>
            <div className="reason-badge">
              Reason #{currentIndex + 1} of {reasons.length}
            </div>
            <p className="reason-text">"{reasons[currentIndex]}"</p>
          </div>

          <div className="reason-controls">
            <button className="btn-romantic" onClick={drawNextReason}>
              <Sparkles size={16} />
              <span>Draw Another Reason</span>
            </button>
            <button
              className="btn-outline-romantic"
              onClick={() => setShowAll((prev) => !prev)}
            >
              <List size={16} />
              <span>{showAll ? 'Hide All Reasons' : 'View All Reasons'}</span>
            </button>
          </div>
        </div>

        {showAll && (
          <div className="all-reasons-container">
            {reasons.map((reason, index) => (
              <div className="reason-tile" key={index}>
                <strong style={{ color: 'var(--gold-primary)' }}>#{index + 1}: </strong>
                {reason}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
