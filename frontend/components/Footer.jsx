import React from "react";
import { useTranslation } from 'react-i18next';

export default function Footer({ onOpenWelcomeModal }) {
  const { t } = useTranslation();
  return (
    <footer className="apple-footer">
      <div className="apple-footer-content">
        {/* Main Footer Content */}
        <div className="apple-footer-main">
          <div className="apple-footer-brand">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-2">{t('footer.brand')}</h3>
            <p className="text-gray-700 dark:text-gray-300">{t('footer.tagline')}</p>
          </div>
          
          <div className="apple-footer-links">
            <div className="apple-footer-section">
              <h4 className="apple-footer-title">{t('footer.shop.title')}</h4>
              <ul className="apple-footer-list">
                <li><a href="/">{t('footer.shop.home')}</a></li>
                <li><a href="/products">{t('footer.shop.products')}</a></li>
                <li><a href="/cart">{t('footer.shop.bag')}</a></li>
              </ul>
            </div>
            
            <div className="apple-footer-section">
              <h4 className="apple-footer-title">{t('footer.support.title')}</h4>
              <ul className="apple-footer-list">
                <li><a href="#">{t('footer.support.contact')}</a></li>
                <li><a href="#">{t('footer.support.help')}</a></li>
                <li><a href="#">{t('footer.support.returns')}</a></li>
              </ul>
            </div>
            
            <div className="apple-footer-section">
              <h4 className="apple-footer-title">{t('footer.connect.title')}</h4>
              <ul className="apple-footer-list">
                <li>
                  <a 
                    href="https://github.com/Kyuuto09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    {t('footer.connect.github')}
                  </a>
                </li>
                <li>
                  <button
                    onClick={onOpenWelcomeModal}
                    className="user-experience-btn"
                  >
                    ⚙️ {t('footer.connect.userExperience')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="apple-footer-bottom">
          <div className="apple-footer-divider"></div>
          <div className="apple-footer-copyright">
            <p className="made-with-love">
              {t('footer.madeBy')}{" "}
              <a 
                href="https://github.com/Kyuuto09" 
                target="_blank" 
                rel="noopener noreferrer"
                className="creator-link"
              >
                Kyuuto09
              </a>
              {" "}{t('footer.with')}{" "}
              <span className="love-emoji" role="img" aria-label="love">💖</span>
              {" "}{t('footer.and')}{" "}
              <span className="coffee-emoji" role="img" aria-label="coffee">☕</span>
            </p>
            <p className="copyright-text">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}