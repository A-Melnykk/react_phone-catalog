import React from 'react';
import { CartItem as CartItemType } from '../../types/CartItem';
import styles from './CartItem.module.scss';

interface Props {
  item: CartItemType;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export const CartItem: React.FC<Props> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const { product, quantity } = item;

  return (
    <div className={styles.cartItem}>
      <button
        type="button"
        className={styles.removeBtn}
        onClick={() => onRemove(product.id)}
      >
        ×
      </button>

      <img src={product.image} alt={product.name} className={styles.image} />

      <p className={styles.title}>{product.name}</p>

      <div className={styles.quantityControls}>
        <button
          type="button"
          className={styles.countBtn}
          onClick={() => onDecrease(product.id)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className={styles.count}>{quantity}</span>
        <button
          type="button"
          className={styles.countBtn}
          onClick={() => onIncrease(product.id)}
        >
          +
        </button>
      </div>

      <div className={styles.price}>${product.price * quantity}</div>
    </div>
  );
};
