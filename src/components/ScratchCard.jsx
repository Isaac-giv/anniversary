import React, { useRef, useEffect, useState } from 'react';
import { Gift, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ScratchCard = ({ scratchConfig }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#a4133c');
    gradient.addColorStop(0.3, '#ff758f');
    gradient.addColorStop(0.5, '#f5d77f');
    gradient.addColorStop(0.7, '#ff758f');
    gradient.addColorStop(1, '#800f2f');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = 'bold 18px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE TO REVEAL ✨', width / 2, height / 2 - 10);
    ctx.font = '14px Outfit, sans-serif';
    ctx.fillText('❤️ A Special Gift For You ❤️', width / 2, height / 2 + 20);

    canvas.style.display = 'block';
    canvas.style.opacity = '1';
    setIsRevealed(false);
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [scratchConfig]);

  const handleScratch = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    checkPercentage();
  };

  const checkPercentage = () => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const ctx = canvas.getContext('2d');
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) transparentCount++;
      }
      const total = pixels.length / 16;
      const pct = (transparentCount / total) * 100;

      if (pct > 40) {
        setIsRevealed(true);
        canvas.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.style.display = 'none';
        }, 600);

        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#ff4d6d', '#ff758f', '#f5d77f', '#ffffff']
        });
      }
    } catch (err) {
      // Ignore security errors
    }
  };

  return (
    <section id="surprise" className="section-container">
      <div className="section-header">
        <div className="section-tag">
          <Gift size={16} />
          <span>Special Anniversary Gift</span>
        </div>
        <h2 className="section-title">A Scratch-Off Surprise</h2>
        <p className="section-desc">
          {scratchConfig?.instructions ||
            'Scratch the card below with your finger or mouse to reveal your anniversary surprise!'}
        </p>
      </div>

      <div className="scratch-card-container">
        <div className="scratch-card-wrapper" ref={containerRef}>
          {/* Hidden Message Content */}
          <div className="scratch-hidden-content">
            <div className="surprise-icon">🧖‍♀️</div>
            <div className="surprise-badge">SPECIAL ANNIVERSARY VOUCHER</div>
            <div className="surprise-message">
              {scratchConfig?.hiddenMessage ||
                '✨ Special Spa Day When I Have The Money My Love 🧖‍♀️💖 ✨'}
            </div>
            <div className="surprise-note">
              {scratchConfig?.rewardNote ||
                'Redeemable anytime, no expiration date! (Love you forever ❤️)'}
            </div>
          </div>

          {/* Canvas Scratch Overlay */}
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onMouseMove={(e) => {
              if (e.buttons === 1) handleScratch(e);
            }}
            onMouseDown={handleScratch}
            onTouchMove={handleScratch}
            onTouchStart={handleScratch}
          />
        </div>

        <div className="scratch-actions">
          <button className="btn-outline-romantic" onClick={initCanvas}>
            <RotateCcw size={16} />
            <span>Reset Scratch Card</span>
          </button>
        </div>
      </div>
    </section>
  );
};
