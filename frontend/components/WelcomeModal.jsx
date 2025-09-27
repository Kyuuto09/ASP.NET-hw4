import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../src/hooks/useTheme';

export default function WelcomeModal({ forceShow = false, onClose = () => {} }) {
  const { i18n } = useTranslation();
  const { setThemeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [isVisible, setIsVisible] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' }
  ];

  // Cookie helper functions
  const setCookie = (name, value, days = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  useEffect(() => {
    // Check if user has seen the welcome modal
    const hasSeenWelcome = getCookie('hasSeenWelcome');
    if (!hasSeenWelcome || forceShow) {
      setIsOpen(true);
      setCanContinue(false);
      setCountdown(3);
      setTimeout(() => setIsVisible(true), 100);
      
      // Start 3-second countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanContinue(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [forceShow]);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    // Apply theme immediately for preview
    setThemeMode(theme);
  };

  const handleSave = () => {
    if (!canContinue) return; // Prevent saving before countdown
    
    // Apply selected language and theme
    i18n.changeLanguage(selectedLanguage);
    setThemeMode(selectedTheme);
    
    // Save preferences and mark as seen using cookies
    setCookie('userLanguage', selectedLanguage);
    setCookie('userTheme', selectedTheme);
    setCookie('hasSeenWelcome', 'true');
    
    // Close modal with animation
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      onClose(); // Notify parent component
    }, 300);
  };

  const handleClose = () => {
    // Use defaults: English and Light mode
    i18n.changeLanguage('en');
    setThemeMode('light');
    setCookie('hasSeenWelcome', 'true');
    
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      onClose(); // Notify parent component
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className={`welcome-modal-overlay ${isVisible ? 'visible' : ''}`}>
      <div className={`welcome-modal ${isVisible ? 'visible' : ''}`}>
        {/* Header */}
        <div className="welcome-modal-header">
          <div className="welcome-icon">✨</div>
          <h2 className="welcome-title">Welcome to My E-Shop</h2>
          <p className="welcome-subtitle">Choose your perfect experience</p>
        </div>

        {/* Content */}
        <div className="welcome-modal-content">
          {/* Language Selection */}
          <div className="preference-section">
            <h3 className="preference-title">
              <span className="preference-icon">🌍</span>
              Language / 言語 / Мова
            </h3>
            <div className="language-grid">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`language-option ${selectedLanguage === lang.code ? 'selected' : ''}`}
                >
                  <span className="language-flag">{lang.flag}</span>
                  <span className="language-name">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div className="preference-section">
            <h3 className="preference-title">
              <span className="preference-icon">🎨</span>
              Theme / テーマ / Тема
            </h3>
            <div className="theme-grid">
              <button
                onClick={() => handleThemeChange('light')}
                className={`theme-option ${selectedTheme === 'light' ? 'selected' : ''}`}
              >
                <div className="theme-preview light-preview">
                  <div className="theme-header"></div>
                  <div className="theme-content">
                    <div className="theme-line"></div>
                    <div className="theme-line short"></div>
                  </div>
                </div>
                <span className="theme-name">Light</span>
              </button>
              
              <button
                onClick={() => handleThemeChange('dark')}
                className={`theme-option ${selectedTheme === 'dark' ? 'selected' : ''}`}
              >
                <div className="theme-preview dark-preview">
                  <div className="theme-header"></div>
                  <div className="theme-content">
                    <div className="theme-line"></div>
                    <div className="theme-line short"></div>
                  </div>
                </div>
                <span className="theme-name">Dark</span>
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="welcome-modal-actions">
          <button onClick={handleClose} className="welcome-btn secondary">
            Skip (Use Defaults)
          </button>
          <button 
            onClick={handleSave} 
            disabled={!canContinue}
            className={`welcome-btn primary ${!canContinue ? 'disabled' : ''}`}
          >
            {canContinue ? 'Continue' : `Continue (${countdown}s)`}
          </button>
        </div>

        {/* Close button */}
        <button onClick={handleClose} className="welcome-close-btn">
          ×
        </button>
      </div>
    </div>
  );
}