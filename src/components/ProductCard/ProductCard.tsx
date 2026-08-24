import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import classNames from 'classnames';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isAdded = isInCart(product.id);
  const favorite = isFavorite(product.id);

  return (
    <div className={styles.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.imageLink}
      >
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.title}
      >
        {product.name}
      </Link>

      <div className={styles.priceContainer}>
        <span className={styles.price}>${product.price}</span>
        <span className={styles.fullPrice}>${product.fullPrice}</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          className={classNames(styles.addToCart, {
            [styles.added]: isAdded,
          })}
          onClick={() => addToCart(product)}
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames(styles.favorite, {
            [styles.favoriteActive]: favorite,
          })}
          onClick={() => toggleFavorite(product)}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};
