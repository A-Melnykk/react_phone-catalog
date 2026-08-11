import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <NavLink to="/" className={styles.footer__logo}>
          LOGO
        </NavLink>

        <nav className={styles.footer__nav}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
          >
            Github
          </a>
          <a href="#/contacts" className={styles.footer__link}>
            Contacts
          </a>
          <a href="#/rights" className={styles.footer__link}>
            Rights
          </a>
        </nav>

        <button
          type="button"
          className={styles.footer__backToTop}
          onClick={scrollToTop}
        >
          Back to top
          <span className={styles.footer__arrow}>↑</span>
        </button>
      </div>
    </footer>
  );
};
