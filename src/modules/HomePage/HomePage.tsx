import React, { useEffect, useState, useMemo } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { PicturesSlider } from '../../components/PicturesSlider';
import { Categories } from '../../components/Categories';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const hotPricesProducts = useMemo(() => {
    return [...products].sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year || b.price - a.price);
  }, [products]);

  const phonesCount = useMemo(
    () => products.filter(p => p.category === 'phones').length,
    [products],
  );

  const tabletsCount = useMemo(
    () => products.filter(p => p.category === 'tablets').length,
    [products],
  );

  const accessoriesCount = useMemo(
    () => products.filter(p => p.category === 'accessories').length,
    [products],
  );

  if (isLoading) {
    return <div className={styles.homePage}>Loading...</div>;
  }

  return (
    <div className={styles.homePage}>
      <h1 className={styles.homePage__title}>Product Catalog</h1>
      <PicturesSlider />

      <ProductsSlider title="Hot prices" products={hotPricesProducts} />

      <Categories
        phonesCount={phonesCount}
        tabletsCount={tabletsCount}
        accessoriesCount={accessoriesCount}
      />

      <ProductsSlider title="Brand new" products={brandNewProducts} />
    </div>
  );
};
