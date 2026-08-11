import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);

  return (
    <div className={styles.card}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.card__imageContainer}
      >
        <img
          src={product.image}
          alt={product.name}
          className={styles.card__image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.card__title}>
        {product.name}
      </Link>

      <div className={styles.card__prices}>
        <span className={styles.card__price}>${product.price}</span>
        {product.fullPrice > product.price && (
          <span
            className={`${styles.card__price} ${styles['card__price--full']}`}
          >
            ${product.fullPrice}
          </span>
        )}
      </div>

      <div className={styles.card__specs}>
        <div className={styles.card__specRow}>
          <span className={styles.card__specName}>Screen</span>
          <span className={styles.card__specValue}>{product.screen}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specName}>Capacity</span>
          <span className={styles.card__specValue}>{product.capacity}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specName}>RAM</span>
          <span className={styles.card__specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.card__buttons}>
        <button
          type="button"
          className={`${styles.card__addButton} ${
            inCart ? styles['card__addButton--added'] : ''
          }`}
          onClick={() => addToCart(product)}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.card__favButton} ${
            favorite ? styles['card__favButton--active'] : ''
          }`}
          onClick={() => toggleFavorite(product)}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};
