import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import './App.scss';

export const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <FavoritesProvider>
          <div className="app">
            <Header />

            <main className="app__main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />

                <Route
                  path="/phones"
                  element={
                    <CatalogPage title="Mobile phones" category="phones" />
                  }
                />
                <Route
                  path="/tablets"
                  element={<CatalogPage title="Tablets" category="tablets" />}
                />
                <Route
                  path="/accessories"
                  element={
                    <CatalogPage title="Accessories" category="accessories" />
                  }
                />

                <Route
                  path="/product/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
