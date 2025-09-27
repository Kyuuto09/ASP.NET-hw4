import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function CookieNotificationFixed() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Cookie helper functions
  const setCookie = (name, value, days = 365) => {
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    } catch (error) {
      console.warn('Failed to set cookie:', error);
    }
  };

  const getCookie = (name) => {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    } catch (error) {
      console.warn('Failed to get cookie:', error);
      return null;
    }
  };

  useEffect(() => {
    try {
      // Check if user has already accepted cookies
      const cookieConsent = getCookie('cookieConsent');
      if (!cookieConsent) {
        // Show notification after a short delay
        setTimeout(() => {
          setIsVisible(true);
          setTimeout(() => setIsAnimating(true), 100);
        }, 1000);
      }
    } catch (error) {
      console.warn('Cookie notification error:', error);
    }
  }, []);

  const handleAccept = () => {
    try {
      setCookie('cookieConsent', 'accepted');
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    } catch (error) {
      console.warn('Failed to accept cookies:', error);
    }
  };

  const handleDecline = () => {
    try {
      setCookie('cookieConsent', 'declined');
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    } catch (error) {
      console.warn('Failed to decline cookies:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`cookie-notification-overlay ${isAnimating ? 'visible' : ''}`}>
      <div className={`cookie-notification ${isAnimating ? 'visible' : ''}`}>
        {/* Icon */}
        <div className="cookie-icon">
          🍪
        </div>
        
        {/* Content */}
        <div className="cookie-content">
          <h3 className="cookie-title">{t('cookies.title', 'We use cookies')}</h3>
          <p className="cookie-description">
            {t('cookies.description', 'We use cookies only to enhance your experience by remembering your preferences.')}
          </p>
          <div className="cookie-features">
            <div className="cookie-feature">
              <span className="feature-icon">🎨</span>
              <span>{t('cookies.features.theme', 'Theme preference')}</span>
            </div>
            <div className="cookie-feature">
              <span className="feature-icon">🌍</span>
              <span>{t('cookies.features.language', 'Language choice')}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="cookie-actions">
          <button 
            onClick={handleDecline}
            className="cookie-btn secondary"
          >
            {t('cookies.decline', 'Decline')}
          </button>
          <button 
            onClick={handleAccept}
            className="cookie-btn primary"
          >
            {t('cookies.accept', 'Accept')}
          </button>
        </div>

        {/* Privacy link */}
        <div className="cookie-privacy">
          <span className="privacy-text">{t('cookies.privacy', 'No tracking, no analytics - just better UX! 🎉')}</span>
        </div>
      </div>
    </div>
  );
}