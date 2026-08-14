import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.header__link} ${isActive ? styles['header__link--active'] : ''}`;

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Link to="/" className={styles.header__logo}>
          <img src="/img/logo.svg" alt="Nice Gadgets Logo" />
        </Link>

        <nav className={styles.header__nav}>
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            Accessories
          </NavLink>
        </nav>
      </div>

      <div className={styles.header__actions}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.header__iconLink} ${isActive ? styles['header__iconLink--active'] : ''}`
          }
        >
          <img src="/img/favourites.svg" alt="Favorites" />
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles.header__iconLink} ${isActive ? styles['header__iconLink--active'] : ''}`
          }
        >
          <img src="/img/cart.svg" alt="Cart" />
        </NavLink>
      </div>
    </header>
  );
};
