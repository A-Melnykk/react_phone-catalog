import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  return (
    <div className={styles.cart}>
      <h1 className={styles.cart__title}>Cart</h1>

      <div className={styles.cart__content}>
        <div className={styles.cart__list}>
          {cart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.product.id)}
              >
                ×
              </button>

              <img
                src={item.product.image}
                alt={item.product.name}
                className={styles.itemImage}
              />

              <span className={styles.itemTitle}>{item.product.name}</span>

              <div className={styles.quantityControls}>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  disabled={item.quantity <= 1}
                  onClick={() => decreaseQuantity(item.product.id)}
                >
                  -
                </button>

                <span className={styles.qtyCount}>{item.quantity}</span>

                <button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={() => increaseQuantity(item.product.id)}
                >
                  +
                </button>
              </div>

              <span className={styles.itemPrice}>
                ${item.product.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
