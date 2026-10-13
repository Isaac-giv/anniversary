import React, { useState, useEffect } from 'react';
import { Heart, Clock, Quote, ChevronDown, Sparkles, Hourglass, CalendarHeart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Hero = ({ config }) => {
  const [activeTab, setActiveTab] = useState('countdown'); // 'countdown' or 'together'
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isReached: false,
    isTomorrow: false
  });

  const [timeTogether, setTimeTogether] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0
  });

  useEffect(() => {
    const calculateTimes = () => {
      const now = new Date();
      const startStr = config.relationshipStartDate || '2024-10-14T00:00:00';
      const startDate = new Date(startStr);
      const safeStart = isNaN(startDate.getTime()) ? new Date('2024-10-14T00:00:00') : startDate;

      // 2-Year Anniversary Target Date: exactly 2 years from relationship start
      const anniversaryYear = safeStart.getFullYear() + 2;
      const targetAnniversary = new Date(
        anniversaryYear,
        safeStart.getMonth(),
        safeStart.getDate(),
        0,
        0,
        0
      );

      // --- Countdown Calculation ---
      const diffMs = targetAnniversary.getTime() - now.getTime();
      if (diffMs <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isReached: true,
          isTomorrow: false
        });
      } else {
        const totalSecs = Math.floor(diffMs / 1000);
        const cdDays = Math.floor(totalSecs / 86400);
        const cdHours = Math.floor((totalSecs % 86400) / 3600);
        const cdMins = Math.floor((totalSecs % 3600) / 60);
        const cdSecs = totalSecs % 60;

        // "Tomorrow" check: less than 24 hours away or calendar day before
        const isTomorrow =
          cdDays === 0 ||
          (cdDays === 1 && cdHours < 24) ||
          (now.getFullYear() === targetAnniversary.getFullYear() &&
            now.getMonth() === targetAnniversary.getMonth() &&
            targetAnniversary.getDate() - now.getDate() === 1);

        setCountdown({
          days: cdDays,
          hours: cdHours,
          minutes: cdMins,
          seconds: cdSecs,
          isReached: false,
          isTomorrow
        });
      }

      // --- Exact Calendar "Time Together" Calculation ---
      let years = now.getFullYear() - safeStart.getFullYear();
      let months = now.getMonth() - safeStart.getMonth();
      let days = now.getDate() - safeStart.getDate();
      let hours = now.getHours() - safeStart.getHours();
      let minutes = now.getMinutes() - safeStart.getMinutes();
      let seconds = now.getSeconds() - safeStart.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonthLastDay;
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      const totalDays = Math.max(
        0,
        Math.floor((now.getTime() - safeStart.getTime()) / (1000 * 60 * 60 * 24))
      );

      setTimeTogether({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
        totalDays
      });
    };

    calculateTimes();
    const interval = setInterval(calculateTimes, 1000);
    return () => clearInterval(interval);
  }, [config.relationshipStartDate]);

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.7, x: 0.2 },
      colors: ['#ff4d6d', '#ff758f', '#f5d77f', '#ffffff']
    });
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.7, x: 0.8 },
      colors: ['#ff4d6d', '#ff758f', '#f5d77f', '#ffffff']
    });
  };

  const startDateObj = new Date(config.relationshipStartDate || '2024-10-14T00:00:00');
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
          <span>
            {countdown.isReached
              ? '🎉 Happy 2-Year Anniversary Today! 🥂'
              : countdown.isTomorrow
              ? '✨ Tomorrow is Our 2-Year Anniversary! (Oct 14th) ✨'
              : 'Celebrating Our 2-Year Milestone ✨'}
          </span>
        </div>

        <h1 className="hero-title">{config.anniversaryTitle || 'Happy Anniversary, My Love'}</h1>

        <div className="couple-names-display">
          <span className="person-name">{config.yourName || 'Isaac'}</span>
          <div className="heart-connector">
            <Heart className="filled-heart" size={24} />
          </div>
          <span className="person-name">{config.partnerName || 'Hameeda'}</span>
        </div>

        <p className="hero-subtitle">
          {config.subtitle || 'Every second with you is my favorite memory.'}
        </p>

        {/* Live Relationship Counter Card */}
        <div className="counter-card-container">
          {/* Mode Switcher Tabs */}
          <div className="counter-tabs-bar">
            <button
              type="button"
              className={`counter-tab-btn ${activeTab === 'countdown' ? 'active' : ''}`}
              onClick={() => setActiveTab('countdown')}
            >
              <Hourglass size={15} />
              <span>
                {countdown.isReached ? 'Anniversary Day' : 'Countdown to 2nd Anniversary'}
              </span>
            </button>
            <button
              type="button"
              className={`counter-tab-btn ${activeTab === 'together' ? 'active' : ''}`}
              onClick={() => setActiveTab('together')}
            >
              <CalendarHeart size={15} />
              <span>Total Time in Love</span>
            </button>
          </div>

          {/* Header Message */}
          <div className="counter-header">
            <Clock className="counter-header-icon" size={18} />
            {activeTab === 'countdown' ? (
              <span>
                {countdown.isReached
                  ? '🎉 Celebrating 2 Full Years of Love Today! 🎉'
                  : countdown.isTomorrow
                  ? '⏳ Countdown to Our 2nd Anniversary (Tomorrow!):'
                  : '⏳ Countdown to Our 2-Year Anniversary:'}
              </span>
            ) : (
              <span>We have been deeply in love for:</span>
            )}
          </div>

          {/* Grid: Countdown Mode (4 boxes) or Time Together Mode (6 boxes) */}
          {activeTab === 'countdown' ? (
            <div className="counter-grid countdown-grid">
              <div className="counter-box">
                <div className="counter-number">
                  {String(countdown.days).padStart(2, '0')}
                </div>
                <div className="counter-label">Days</div>
              </div>
              <div className="counter-box">
                <div className="counter-number">
                  {String(countdown.hours).padStart(2, '0')}
                </div>
                <div className="counter-label">Hours</div>
              </div>
              <div className="counter-box">
                <div className="counter-number">
                  {String(countdown.minutes).padStart(2, '0')}
                </div>
                <div className="counter-label">Minutes</div>
              </div>
              <div className="counter-box highlight">
                <div className="counter-number">
                  {String(countdown.seconds).padStart(2, '0')}
                </div>
                <div className="counter-label">Seconds</div>
              </div>
            </div>
          ) : (
            <div className="counter-grid">
              <div className="counter-box">
                <div className="counter-number">{timeTogether.years}</div>
                <div className="counter-label">Years</div>
              </div>
              <div className="counter-box">
                <div className="counter-number">{timeTogether.months}</div>
                <div className="counter-label">Months</div>
              </div>
              <div className="counter-box">
                <div className="counter-number">
                  {String(timeTogether.days).padStart(2, '0')}
                </div>
                <div className="counter-label">Days</div>
              </div>
              <div className="counter-box">
                <div className="counter-number">
                  {String(timeTogether.hours).padStart(2, '0')}
                </div>
                <div className="counter-label">Hours</div>
              </div>
              <div className="counter-box">
                <div className="counter-number">
                  {String(timeTogether.minutes).padStart(2, '0')}
                </div>
                <div className="counter-label">Minutes</div>
              </div>
              <div className="counter-box highlight">
                <div className="counter-number">
                  {String(timeTogether.seconds).padStart(2, '0')}
                </div>
                <div className="counter-label">Seconds</div>
              </div>
            </div>
          )}

          {/* Footer with note & confetti button */}
          <div className="counter-footer">
            <span className="counter-footer-note">
              {activeTab === 'countdown' ? (
                countdown.isReached ? (
                  <>October 14th — Happy 2nd Anniversary, Hameeda! ❤️</>
                ) : countdown.isTomorrow ? (
                  <>Almost there! Tomorrow (October 14th) is our 2-Year Anniversary! 🥂</>
                ) : (
                  <>Counting down to October 14th ✨</>
                )
              ) : (
                <>
                  Since {formattedStartDate} • {timeTogether.totalDays} Days of Pure Love
                </>
              )}
            </span>
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
            {config.heroQuoteAuthor && (
              <div className="quote-author">— {config.heroQuoteAuthor}</div>
            )}
          </div>
        )}

        <a href="#timeline" className="scroll-down-indicator">
          <span>Scroll to explore our memories</span>
          <ChevronDown className="bounce-arrow" size={20} />
        </a>
      </div>
    </section>
  );
};
