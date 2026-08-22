import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Categories';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const brandNewProducts = [...products]
    .sort((a, b) => b.year - a.year || b.price - a.price)
    .map(product => ({
      ...product,
      fullPrice: product.price,
    }));

  const hotPricesProducts = [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <div className={styles.homePage}>
      <h1 className={styles.homePage__title}>Product Catalog</h1>
      <PicturesSlider />

      <ProductsSlider title="Brand new" products={brandNewProducts} />

      <Categories
        phonesCount={phonesCount}
        tabletsCount={tabletsCount}
        accessoriesCount={accessoriesCount}
      />

      <ProductsSlider title="Hot prices" products={hotPricesProducts} />
    </div>
  );
};
