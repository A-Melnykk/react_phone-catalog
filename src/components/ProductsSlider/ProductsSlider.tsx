import React, { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [startIndex, setStartIndex] = useState(0);

  const visibleCards = 4;
  const maxIndex = Math.max(0, products.length - visibleCards);

  const handlePrev = () => {
    setStartIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const translateX = startIndex * 288;

  return (
    <section className={styles.productsSlider}>
      <div className={styles.productsSlider__header}>
        <h2 className={styles.productsSlider__title}>{title}</h2>

        <div className={styles.productsSlider__buttons}>
          <button
            type="button"
            className={styles.productsSlider__btn}
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.productsSlider__btn}
            onClick={handleNext}
            disabled={startIndex >= maxIndex}
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.productsSlider__content}>
        <div
          className={styles.productsSlider__track}
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.productsSlider__item}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
