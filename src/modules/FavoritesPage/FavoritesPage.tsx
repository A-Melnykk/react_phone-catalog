import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductCard } from '../../components/ProductCard';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.favoritesPage__title}>Favorites</h1>
      <p className={styles.favoritesPage__count}>{favorites.length} items</p>

      {favorites.length > 0 ? (
        <div className={styles.favoritesPage__grid}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.favoritesPage__empty}>
          Your favorites list is empty.
        </p>
      )}
    </div>
  );
};
