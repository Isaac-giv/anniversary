import React, { useState } from 'react';
import { Scroll, Sparkles, Archive } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SecretLoveLetter = ({ partnerName, yourName, secretLetter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpeningFlap, setIsOpeningFlap] = useState(false);

  const handleOpenLetter = () => {
    setIsOpeningFlap(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpeningFlap(false);
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#f5d77f', '#ffffff']
      });
    }, 450);
  };

  const handleFoldBack = () => {
    setIsOpen(false);
  };

  return (
    <section id="letter" className="section-container letter-section">
      <div className="section-header">
        <div className="section-tag">
          <Scroll size={16} />
          <span>A Sealed Letter</span>
        </div>
        <h2 className="section-title">My Letter To You</h2>
        <p className="section-desc">
          Tap the wax seal below to break the seal and unfold my heartfelt letter to you.
        </p>
      </div>

      <div className="envelope-experience">
        {!isOpen ? (
          /* 3D Wax Envelope */
          <div className="wax-envelope-wrapper" onClick={handleOpenLetter}>
            <div className="envelope-body">
              <div
                className="envelope-flap"
                style={{
                  transform: isOpeningFlap ? 'rotateX(180deg)' : 'rotateX(0deg)'
                }}
              >
                <div className="wax-seal" title="Click to break seal & open letter">
                  <span className="wax-stamp">❤️</span>
                  <span className="seal-ripple"></span>
                </div>
              </div>
              <div className="envelope-front">
                <div className="envelope-to">
                  <span className="to-label">To My Soulmate:</span>
                  <span className="to-name">{partnerName || 'Hameeda'}</span>
                </div>
                <div className="postage-stamp">
                  <Sparkles size={14} />
                  <span>ANNIVERSARY</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Unfolded Parchment Letter */
          <div className="parchment-letter">
            <div className="parchment-inner">
              <div className="parchment-header">
                <span className="parchment-seal-mark">⚜️</span>
                <h3 className="parchment-salutation">
                  {secretLetter?.salutation || 'To My Dearest Hameeda,'}
                </h3>
              </div>

              <div className="parchment-body">
                {secretLetter?.paragraphs?.map((p, index) => (
                  <p key={index}>{p}</p>
                ))}
              </div>

              <div className="parchment-footer">
                <div className="parchment-closing">
                  {secretLetter?.closing || 'Forever & Always Yours,'}
                </div>
                <div className="parchment-signature">
                  {secretLetter?.signature || `${yourName || 'Isaac'} ❤️`}
                </div>
              </div>

              <button className="btn-fold-letter" onClick={handleFoldBack}>
                <Archive size={16} />
                <span>Fold Letter Back</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
