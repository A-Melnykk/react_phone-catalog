import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import './App.scss';

export const App: React.FC = () => (
  <CartProvider>
    <FavoritesProvider>
      <div className="app">
        <Header />
        <main className="app__main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  </CartProvider>
);
