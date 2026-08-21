import React, { useState, useEffect } from 'react';
import { Heart, Clock, Quote, ChevronDown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Hero = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateTimer = () => {
      const startDate = new Date(config.relationshipStartDate || '2023-08-21T00:00:00').getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - startDate);

      const secondsTotal = Math.floor(diff / 1000);
      const minutesTotal = Math.floor(secondsTotal / 60);
      const hoursTotal = Math.floor(minutesTotal / 60);
      const daysTotal = Math.floor(hoursTotal / 24);

      const years = Math.floor(daysTotal / 365.25);
      const months = Math.floor((daysTotal % 365.25) / 30.4375);
      const days = Math.floor(daysTotal % 30.4375);
      const hours = hoursTotal % 24;
      const minutes = minutesTotal % 60;
      const seconds = secondsTotal % 60;

      setTimeLeft({ years, months, days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [config.relationshipStartDate]);

  const handleConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7, x: 0.2 },
      colors: ['#ff4d6d', '#ff758f', '#f5d77f', '#ffffff']
    });
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7, x: 0.8 },
      colors: ['#ff4d6d', '#ff758f', '#f5d77f', '#ffffff']
    });
  };

  const startDateObj = new Date(config.relationshipStartDate || '2023-08-21T00:00:00');
  const formattedStartDate = startDateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section id="hero" className="hero-section">
      <div className="hero-glow-orb orb-1"></div>
      <div className="hero-glow-orb orb-2"></div>

      <div className="hero-content">
        <div className="badge-pill">
          <span className="badge-dot"></span>
          <span>Celebrating Our 2-Year Milestone ✨</span>
        </div>

        <h1 className="hero-title">{config.anniversaryTitle || 'Happy Anniversary, My Love'}</h1>

        <div className="couple-names-display">
          <span className="person-name">{config.yourName || 'Isaac'}</span>
          <div className="heart-connector">
            <Heart className="filled-heart" size={24} />
          </div>
          <span className="person-name">{config.partnerName || 'Hameeda'}</span>
        </div>

        <p className="hero-subtitle">{config.subtitle || 'Every second with you is my favorite memory.'}</p>

        {/* Live Relationship Counter */}
        <div className="counter-card-container">
          <div className="counter-header">
            <Clock className="counter-header-icon" size={18} />
            <span>We have been deeply in love for:</span>
          </div>

          <div className="counter-grid">
            <div className="counter-box">
              <div className="counter-number">{timeLeft.years}</div>
              <div className="counter-label">Years</div>
            </div>
            <div className="counter-box">
              <div className="counter-number">{timeLeft.months}</div>
              <div className="counter-label">Months</div>
            </div>
            <div className="counter-box">
              <div className="counter-number">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="counter-label">Days</div>
            </div>
            <div className="counter-box">
              <div className="counter-number">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="counter-label">Hours</div>
            </div>
            <div className="counter-box">
              <div className="counter-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="counter-label">Minutes</div>
            </div>
            <div className="counter-box highlight">
              <div className="counter-number">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="counter-label">Seconds</div>
            </div>
          </div>

          <div className="counter-footer">
            <span>Since {formattedStartDate}</span>
            <button onClick={handleConfetti} className="btn-romantic-small">
              <span>Send Love & Confetti</span> 💖
            </button>
          </div>
        </div>

        {/* Romantic Quote Glass Card */}
        {config.heroQuote && (
          <div className="quote-glass-card">
            <Quote className="quote-icon" size={24} />
            <p className="quote-text">"{config.heroQuote}"</p>
            {config.heroQuoteAuthor && <div className="quote-author">— {config.heroQuoteAuthor}</div>}
          </div>
        )}

        <a href="#gallery" className="scroll-down-indicator">
          <span>Scroll to explore our memories</span>
          <ChevronDown className="bounce-arrow" size={20} />
        </a>
      </div>
    </section>
  );
};
