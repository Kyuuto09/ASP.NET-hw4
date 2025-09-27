import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../src/hooks/useTheme';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const isDarkMode = theme === 'dark';

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-switcher custom-dropdown" ref={dropdownRef} style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="custom-select-btn"
        style={{
          background: 'transparent',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '20px',
          padding: '8px 32px 8px 12px',
          fontSize: '14px',
          fontWeight: '500',
          color: isDarkMode ? '#f5f5f7' : '#000000',
          cursor: 'pointer',
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          minWidth: '80px',
          position: 'relative'
        }}
      >
        <span>{currentLanguage.flag} {currentLanguage.name}</span>
        <span style={{ 
          marginLeft: 'auto', 
          fontSize: '12px',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>▼</span>
      </button>

      {isOpen && (
        <div 
          className="custom-dropdown-menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            background: isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
            marginTop: '4px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            zIndex: 9999
          }}
        >
          {languages.map(lang => (
            <div
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                color: isDarkMode ? '#f5f5f7' : '#1d1d1f',
                fontSize: '14px',
                fontWeight: i18n.language === lang.code ? '600' : '400',
                background: i18n.language === lang.code ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'transparent',
                borderBottom: '1px solid ' + (isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)')
              }}
              onMouseEnter={(e) => {
                e.target.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = i18n.language === lang.code ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'transparent';
              }}
            >
              {lang.flag} {lang.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;