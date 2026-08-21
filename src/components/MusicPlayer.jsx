import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

export const MusicPlayer = ({ musicConfig }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthIntervalRef = useRef(null);

  // Autoplay handler
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startPlay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          cleanupListeners();
        })
        .catch(() => {
          // Autoplay blocked by browser policy, wait for first interaction
        });
    };

    const handleFirstInteraction = () => {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          cleanupListeners();
        })
        .catch(() => {});
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    // Try immediate autoplay
    startPlay();

    // Attach listeners for first interaction in case browser blocks unprompted audio
    window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true, passive: true });

    return () => {
      cleanupListeners();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && musicConfig?.url) {
      audioRef.current.src = musicConfig.url;
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.warn(e));
      }
    }
  }, [musicConfig?.url]);

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      stopRomanticSynth();
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioRef.current.src) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('HTML5 Audio playback blocked or failed, using romantic piano synthesizer:', err);
            startRomanticSynth();
            setIsPlaying(true);
          });
      } else {
        startRomanticSynth();
        setIsPlaying(true);
      }
    }
  };

  const startRomanticSynth = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();

      const chords = [
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [220.0, 261.63, 329.63, 392.0],  // Am7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [196.0, 246.94, 293.66, 392.0]   // G7
      ];

      let chordIdx = 0;
      let noteIdx = 0;

      synthIntervalRef.current = setInterval(() => {
        if (!audioCtxRef.current) return;
        const chord = chords[chordIdx];
        const freq = chord[noteIdx % chord.length];

        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

        gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        gain.gain.linearRampToValueAtTime(0.07, audioCtxRef.current.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 1.2);

        noteIdx++;
        if (noteIdx % 4 === 0) {
          chordIdx = (chordIdx + 1) % chords.length;
        }
      }, 480);
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  };

  const stopRomanticSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  return (
    <div
      className={`music-player-pill ${isPlaying ? 'playing' : ''}`}
      onClick={toggleMusic}
      title="Play / Pause Romantic Music"
    >
      <button className="music-toggle-btn" aria-label="Toggle Music">
        {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
      </button>

      <div className="music-info">
        <div className="music-title">{musicConfig?.title || 'Romantic Piano'}</div>
        <div className="music-artist">{musicConfig?.artist || "Can't Help Falling In Love"}</div>
      </div>

      <div className="music-visualizer">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <audio
        ref={audioRef}
        src={musicConfig?.url || '/my_home.mp3'}
        loop
        preload="auto"
        onError={() => {
          console.warn('Audio file not found at url, falling back to romantic piano melody');
          if (audioRef.current && audioRef.current.src !== 'https://assets.mixkit.co/music/preview/mixkit-loving-you-1107.mp3') {
            audioRef.current.src = 'https://assets.mixkit.co/music/preview/mixkit-loving-you-1107.mp3';
            if (isPlaying) audioRef.current.play().catch(() => startRomanticSynth());
          }
        }}
      />
    </div>
  );
};
