import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    changeQuantity,
    clearCart,
    totalPrice,
    totalQuantity,
  } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsModalOpen(true);
    clearCart();
  };

  if (cart.length === 0 && !isModalOpen) {
    return (
      <div className={styles.empty}>
        <h1>Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cart</h1>

      {isModalOpen ? (
        <div className={styles.successMessage}>
          <h2>Checkout successfully completed! 🎉</h2>
          <p>Thank you for your purchase. We will contact you soon.</p>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.itemsList}>
            {cart.map(item => (
              <div
                key={item.product.id}
                className={styles.cartItem}
                data-cy="cartItem"
              >
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => removeFromCart(item.product.id)}
                  data-cy="cartDeleteButton"
                >
                  ✕
                </button>

                <img
                  src={`/${item.product.image}`}
                  alt={item.product.name}
                  className={styles.image}
                />

                <span className={styles.itemName}>{item.product.name}</span>

                <div className={styles.counter}>
                  <button
                    type="button"
                    disabled={item.quantity <= 1}
                    onClick={() => changeQuantity(item.product.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => changeQuantity(item.product.id, 1)}
                  >
                    +
                  </button>
                </div>

                <span className={styles.price}>
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.checkoutBox}>
            <div className={styles.totalPrice}>${totalPrice}</div>
            <div className={styles.totalItems}>
              Total for {totalQuantity} items
            </div>
            <div className={styles.divider} />
            <button
              type="button"
              className={styles.checkoutButton}
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
