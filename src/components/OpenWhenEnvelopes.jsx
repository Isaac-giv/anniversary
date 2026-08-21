import React, { useState } from 'react';
import { Mail, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OpenWhenEnvelopes = ({ letters }) => {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const handleOpenLetter = (letter) => {
    setSelectedLetter(letter);
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#c9184a']
    });
  };

  return (
    <section id="open-when" className="section-container">
      <div className="section-header">
        <div className="section-tag">
          <Mail size={16} />
          <span>Always Here For You</span>
        </div>
        <h2 className="section-title">"Open When..." Envelopes</h2>
        <p className="section-desc">
          Whenever you need comfort, a smile, or a gentle reminder of how much you are loved.
        </p>
      </div>

      <div className="open-when-grid">
        {letters.map((letter) => (
          <div
            key={letter.id || letter.title}
            className="open-when-card"
            onClick={() => handleOpenLetter(letter)}
            title="Click to open letter"
          >
            <div className="open-when-icon">{letter.icon || '💌'}</div>
            <h4 className="open-when-title">{letter.title}</h4>
            <span className="open-when-pill">Tap to Open 💖</span>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {selectedLetter && (
        <div className="modal-backdrop" onClick={() => setSelectedLetter(null)}>
          <div className="letter-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedLetter(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="open-when-modal-icon">{selectedLetter.icon || '💌'}</div>
            <h3 className="open-when-modal-title">{selectedLetter.title}</h3>
            <div className="open-when-modal-divider"></div>
            <p className="open-when-modal-body">{selectedLetter.content}</p>
            <div className="open-when-modal-footer">
              <button
                className="btn-romantic-small"
                onClick={() => setSelectedLetter(null)}
              >
                Close Letter
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
