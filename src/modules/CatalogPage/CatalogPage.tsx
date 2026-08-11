import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import styles from './CatalogPage.module.scss';

interface Props {
  title: string;
  category: string;
}

export const CatalogPage: React.FC<Props> = ({ title, category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPageParam = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(data => {
        const filtered = data.filter(item => item.category === category);

        setProducts(filtered);
      })
      .finally(() => setIsLoading(false));
  }, [category]);

  const sortedProducts = useMemo(() => {
    const copy = [...products];

    switch (sortBy) {
      case 'title':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return copy.sort((a, b) => a.price - b.price);
      case 'age':
      default:
        return copy.sort((a, b) => b.year - a.year);
    }
  }, [products, sortBy]);

  const perPage =
    perPageParam === 'all' ? sortedProducts.length : Number(perPageParam);
  const totalPages = Math.ceil(sortedProducts.length / (perPage || 1));

  const visibleProducts = useMemo(() => {
    if (perPageParam === 'all') {
      return sortedProducts;
    }

    const start = (currentPage - 1) * perPage;

    return sortedProducts.slice(start, start + perPage);
  }, [sortedProducts, currentPage, perPage, perPageParam]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  if (isLoading) {
    return <div className={styles.catalogPage}>Loading...</div>;
  }

  return (
    <div className={styles.catalogPage}>
      <h1 className={styles.catalogPage__title}>{title}</h1>
      <p className={styles.catalogPage__count}>{products.length} models</p>

      {products.length > 0 ? (
        <>
          <div className={styles.catalogPage__filters}>
            <div className={styles.catalogPage__filterGroup}>
              <label htmlFor="sort" className={styles.catalogPage__label}>
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className={styles.catalogPage__select}
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </div>

            <div className={styles.catalogPage__filterGroup}>
              <label htmlFor="perPage" className={styles.catalogPage__label}>
                Items on page
              </label>
              <select
                id="perPage"
                value={perPageParam}
                onChange={handlePerPageChange}
                className={styles.catalogPage__select}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          <div className={styles.catalogPage__grid}>
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {perPageParam !== 'all' && totalPages > 1 && (
            <div className={styles.catalogPage__pagination}>
              <button
                type="button"
                className={styles.catalogPage__pageBtn}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  type="button"
                  className={`${styles.catalogPage__pageBtn} ${
                    page === currentPage
                      ? styles['catalogPage__pageBtn--active']
                      : ''
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className={styles.catalogPage__pageBtn}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          )}
        </>
      ) : (
        <p>There are no products in this category yet.</p>
      )}
    </div>
  );
};
