import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckoutMessageVisible, setIsCheckoutMessageVisible] =
    useState(false);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    setIsCheckoutMessageVisible(true);
    clearCart();
  };

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.cartPage__title}>Cart</h1>

      {isCheckoutMessageVisible && (
        <div className={styles.cartPage__empty}>
          We are sorry, but checkout is not implemented yet. Your cart has been
          cleared.
        </div>
      )}

      {!isCheckoutMessageVisible && cart.length === 0 && (
        <p className={styles.cartPage__empty}>Your cart is empty.</p>
      )}

      {!isCheckoutMessageVisible && cart.length > 0 && (
        <div className={styles.cartPage__content}>
          <div className={styles.cartPage__list}>
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className={styles.cartPage__item}>
                <div className={styles.cartPage__itemInfo}>
                  <button
                    type="button"
                    className={styles.cartPage__removeBtn}
                    onClick={() => removeFromCart(product.id)}
                  >
                    ✕
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.cartPage__image}
                  />
                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.cartPage__name}
                  >
                    {product.name}
                  </Link>
                </div>

                <div className={styles.cartPage__itemActions}>
                  <div className={styles.cartPage__quantity}>
                    <button
                      type="button"
                      className={styles.cartPage__qtyBtn}
                      onClick={() =>
                        updateQuantity(product.id, Math.max(1, quantity - 1))
                      }
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      className={styles.cartPage__qtyBtn}
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <span className={styles.cartPage__price}>
                    ${product.price * quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartPage__summary}>
            <span className={styles.cartPage__totalPrice}>${totalPrice}</span>
            <span className={styles.cartPage__totalCount}>
              Total for {totalQuantity} items
            </span>
            <button
              type="button"
              className={styles.cartPage__checkoutBtn}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
