import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  increaseQuantity: (productId: string | number) => void;
  decreaseQuantity: (productId: string | number) => void;
  isInCart: (productId: string | number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => String(item.product.id) === String(product.id),
      );

      if (existingItem) {
        return prevCart.map(item =>
          String(item.product.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prevCart,
        {
          id: product.id,
          product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId: string | number) => {
    setCart(prevCart =>
      prevCart.filter(item => String(item.product.id) !== String(productId)),
    );
  };

  const increaseQuantity = (productId: string | number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        String(item.product.id) === String(productId)
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId: string | number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          String(item.product.id) === String(productId)
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const isInCart = (productId: string | number) => {
    return cart.some(item => String(item.product.id) === String(productId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
