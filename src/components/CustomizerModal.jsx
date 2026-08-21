import React, { useState, useEffect } from 'react';
import { Sparkles, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CustomizerModal = ({ isOpen, onClose, config, onSave, onReset }) => {
  const [formData, setFormData] = useState(config);
  const [jsonText, setJsonText] = useState('');

  useEffect(() => {
    setFormData(config);
    setJsonText(JSON.stringify(config, null, 2));
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (jsonText && jsonText !== JSON.stringify(formData, null, 2)) {
        const parsed = JSON.parse(jsonText);
        if (parsed.yourName) {
          onSave(parsed);
          onClose();
          fireConfetti();
          return;
        }
      }
    } catch (err) {
      // If JSON parse failed, proceed with form fields
    }

    onSave(formData);
    onClose();
    fireConfetti();
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#f5d77f']
    });
  };

  const formattedStartDate = () => {
    if (!formData.relationshipStartDate) return '';
    const d = new Date(formData.relationshipStartDate);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  return (
    <div className="customizer-drawer" onClick={onClose}>
      <div className="customizer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="customizer-header">
          <div className="customizer-title">
            <Sparkles size={20} />
            <span>Personalize Your Website</span>
          </div>
          <button className="customizer-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="customizer-body">
          <div className="info-alert">
            <Info size={18} />
            <span>
              All edits are saved to your browser automatically! You can change names, dates, quotes, photos, and messages.
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Couple & Dates */}
            <div className="form-group-section">
              <h4 className="form-section-title">💑 Couple & Date</h4>
              <div className="input-row">
                <div className="input-field">
                  <label>Your Name</label>
                  <input
                    type="text"
                    value={formData.yourName || ''}
                    onChange={(e) => handleChange('yourName', e.target.value)}
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Partner's Name</label>
                  <input
                    type="text"
                    value={formData.partnerName || ''}
                    onChange={(e) => handleChange('partnerName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-field">
                <label>Relationship Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={formattedStartDate()}
                  onChange={(e) =>
                    handleChange('relationshipStartDate', new Date(e.target.value).toISOString())
                  }
                  required
                />
              </div>

              <div className="input-field">
                <label>Hero Title</label>
                <input
                  type="text"
                  value={formData.anniversaryTitle || ''}
                  onChange={(e) => handleChange('anniversaryTitle', e.target.value)}
                />
              </div>

              <div className="input-field">
                <label>Hero Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                />
              </div>

              <div className="input-field">
                <label>Hero Romantic Quote</label>
                <textarea
                  rows={2}
                  value={formData.heroQuote || ''}
                  onChange={(e) => handleChange('heroQuote', e.target.value)}
                />
              </div>

              <div className="input-field">
                <label>Quote Author</label>
                <input
                  type="text"
                  value={formData.heroQuoteAuthor || ''}
                  onChange={(e) => handleChange('heroQuoteAuthor', e.target.value)}
                />
              </div>
            </div>

            {/* Music */}
            <div className="form-group-section">
              <h4 className="form-section-title">🎵 Romantic Music</h4>
              <div className="input-field">
                <label>Song Title</label>
                <input
                  type="text"
                  value={formData.music?.title || ''}
                  onChange={(e) => handleNestedChange('music', 'title', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Artist Name</label>
                <input
                  type="text"
                  value={formData.music?.artist || ''}
                  onChange={(e) => handleNestedChange('music', 'artist', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Upload Your Song File (MP3 / Audio)</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        handleNestedChange('music', 'url', event.target?.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div className="input-field">
                <label>Or Audio URL / Local Path (e.g. /my_home.mp3)</label>
                <input
                  type="text"
                  value={formData.music?.url || ''}
                  onChange={(e) => handleNestedChange('music', 'url', e.target.value)}
                  placeholder="/my_home.mp3 or https://..."
                />
              </div>
            </div>

            {/* Secret Letter */}
            <div className="form-group-section">
              <h4 className="form-section-title">💌 Secret Love Letter</h4>
              <div className="input-field">
                <label>Salutation</label>
                <input
                  type="text"
                  value={formData.secretLetter?.salutation || ''}
                  onChange={(e) => handleNestedChange('secretLetter', 'salutation', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Letter Paragraphs (separate with empty line)</label>
                <textarea
                  rows={5}
                  value={(formData.secretLetter?.paragraphs || []).join('\n\n')}
                  onChange={(e) =>
                    handleNestedChange(
                      'secretLetter',
                      'paragraphs',
                      e.target.value.split('\n\n').filter((p) => p.trim())
                    )
                  }
                />
              </div>
              <div className="input-field">
                <label>Signature</label>
                <input
                  type="text"
                  value={formData.secretLetter?.signature || ''}
                  onChange={(e) => handleNestedChange('secretLetter', 'signature', e.target.value)}
                />
              </div>
            </div>

            {/* Advanced JSON */}
            <div className="form-group-section">
              <h4 className="form-section-title">⚙️ Full Data (JSON Export / Import)</h4>
              <div className="input-field">
                <label>Direct JSON Data</label>
                <textarea
                  rows={6}
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
                />
              </div>
            </div>

            <div className="customizer-actions">
              <button
                type="button"
                className="btn-danger-outline"
                onClick={() => {
                  if (confirm('Reset everything back to defaults?')) {
                    onReset();
                    onClose();
                  }
                }}
              >
                Reset Defaults
              </button>
              <button type="submit" className="btn-romantic">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
