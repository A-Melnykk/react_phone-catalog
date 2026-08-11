import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

export const Header: React.FC = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavoritesCount = favorites.length;

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.header__link} ${isActive ? styles['header__link--active'] : ''}`;

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.header__logo}>
        LOGO
      </NavLink>

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

      <div className={styles.header__actions}>
        <NavLink to="/favorites" className={styles.header__iconLink}>
          ❤️
          {totalFavoritesCount > 0 && (
            <span className={styles.header__badge}>{totalFavoritesCount}</span>
          )}
        </NavLink>

        <NavLink to="/cart" className={styles.header__iconLink}>
          🛒
          {totalCartCount > 0 && (
            <span className={styles.header__badge}>{totalCartCount}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
