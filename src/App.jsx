import React, { useState, useEffect } from 'react';
import { Settings2 } from 'lucide-react';
import { DEFAULT_CONFIG } from './data/defaultConfig';
import { AmbientCanvas } from './components/AmbientCanvas';
import { MusicPlayer } from './components/MusicPlayer';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { ScrapbookGallery } from './components/ScrapbookGallery';
import { LoveCapsule } from './components/LoveCapsule';
import { OpenWhenEnvelopes } from './components/OpenWhenEnvelopes';
import { ScratchCard } from './components/ScratchCard';
import { SecretLoveLetter } from './components/SecretLoveLetter';
import { CustomizerModal } from './components/CustomizerModal';
import { LightboxModal } from './components/LightboxModal';

export function App() {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('anniversary_custom_config_v5');
      if (saved) return JSON.parse(saved);
      return DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({ image: null, caption: '', isVideo: false });

  useEffect(() => {
    document.title = `${config.anniversaryTitle || 'Happy Anniversary'} - ${config.yourName || 'Isaac'} & ${config.partnerName || 'Hameeda'} ❤️`;
  }, [config]);

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('anniversary_custom_config_v5', JSON.stringify(newConfig));
    } catch (err) {
      console.error('Failed to save configuration:', err);
    }
  };

  const handleResetConfig = () => {
    localStorage.removeItem('anniversary_custom_config_v5');
    localStorage.removeItem('anniversary_custom_config_v4');
    localStorage.removeItem('anniversary_custom_config_v3');
    localStorage.removeItem('anniversary_custom_config_v2');
    localStorage.removeItem('anniversary_custom_config');
    setConfig(DEFAULT_CONFIG);
  };

  const handleOpenLightbox = (image, caption, isVideo = false) => {
    setLightboxData({ image, caption, isVideo });
  };

  const handleCloseLightbox = () => {
    setLightboxData({ image: null, caption: '', isVideo: false });
  };

  return (
    <div className="app-root">
      {/* Background Animated Stardust & Floating Hearts */}
      <AmbientCanvas />

      {/* Floating Top Nav */}
      <header className="top-nav">
        <div className="nav-brand">
          <span className="heart-icon-pulse">💖</span>
          <span className="brand-text">
            {config.yourName || 'Isaac'} & {config.partnerName || 'Hameeda'}
          </span>
        </div>

        <nav className="nav-links">
          <a href="#hero" className="nav-link active">
            Home
          </a>
          <a href="#timeline" className="nav-link">
            Our Story
          </a>
          <a href="#gallery" className="nav-link">
            Memories
          </a>
          <a href="#reasons" className="nav-link">
            Love Capsule
          </a>
          <a href="#open-when" className="nav-link">
            Open When
          </a>
          <a href="#surprise" className="nav-link">
            Surprise 🎁
          </a>
          <a href="#letter" className="nav-link">
            Love Letter
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="btn-icon"
            onClick={() => setIsCustomizerOpen(true)}
            title="Personalize & Edit Website"
          >
            <Settings2 size={16} />
            <span className="btn-text">Customize</span>
          </button>
        </div>
      </header>

      {/* Floating Music Player Pill */}
      <MusicPlayer musicConfig={config.music} />

      {/* Main Content Area */}
      <main className="content-wrapper">
        <Hero config={config} />

        <Timeline
          timeline={config.timeline || []}
          onImageClick={handleOpenLightbox}
        />

        <ScrapbookGallery
          gallery={config.gallery || []}
          onImageClick={handleOpenLightbox}
        />

        <LoveCapsule reasons={config.reasons || []} />

        <OpenWhenEnvelopes letters={config.openWhenLetters || []} />

        <ScratchCard scratchConfig={config.scratchCard} />

        <SecretLoveLetter
          partnerName={config.partnerName}
          yourName={config.yourName}
          secretLetter={config.secretLetter}
        />

        {/* Footer */}
        <footer className="romantic-footer">
          <div className="footer-hearts">
            <span>❤️</span>
            <span>💖</span>
            <span>💕</span>
            <span>💗</span>
            <span>❤️</span>
          </div>
          <p className="footer-text">
            Crafted with endless love for <strong>{config.partnerName || 'Hameeda'}</strong> by{' '}
            <strong>{config.yourName || 'Isaac'}</strong>.
          </p>
          <p className="footer-subtext">Happy Anniversary to us! Here's to forever together.</p>
        </footer>
      </main>

      {/* Lightbox Modal */}
      <LightboxModal
        image={lightboxData.image}
        caption={lightboxData.caption}
        isVideo={lightboxData.isVideo}
        onClose={handleCloseLightbox}
      />

      {/* Customizer Drawer */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}

export default App;
