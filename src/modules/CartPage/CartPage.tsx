import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    alert('Thank you for your order!');
    clearCart();
  };

  return (
    <div className={styles.cartPage}>
      <button
        type="button"
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      >
        ‹ Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <div className={styles.content}>
          <div className={styles.itemList}>
            {cart.map(item => (
              <CartItem
                key={item.product.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className={styles.totalBlock}>
            <h2 className={styles.totalPrice}>${totalPrice}</h2>
            <p className={styles.totalCount}>
              {`Total for ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
            </p>
            <div className={styles.divider} />
            <button
              type="button"
              className={styles.checkoutBtn}
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
