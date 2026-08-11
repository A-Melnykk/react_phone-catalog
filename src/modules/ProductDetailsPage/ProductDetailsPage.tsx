import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductDetails, getProducts } from '../../api/products';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);

    Promise.all([getProductDetails(productId), getProducts()])
      .then(([detailsData, allProducts]) => {
        if (!detailsData) {
          navigate('/not-found', { replace: true });

          return;
        }

        setDetails(detailsData);
        setSelectedImage(detailsData.images[0]);

        const currentProduct = allProducts.find(
          p => p.itemId === detailsData.id,
        );

        if (currentProduct) {
          setProduct(currentProduct);

          const suggested = allProducts.filter(
            p =>
              p.category === currentProduct.category &&
              p.itemId !== detailsData.id,
          );

          setSuggestedProducts(suggested);
        }
      })
      .finally(() => setIsLoading(false));
  }, [productId, navigate]);

  if (isLoading) {
    return <div className={styles.detailsPage}>Loading...</div>;
  }

  if (!details || !product) {
    return null;
  }

  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);

  const handleCapacityChange = (newCapacity: string) => {
    const newId = details.id.replace(
      details.capacity.toLowerCase(),
      newCapacity.toLowerCase(),
    );

    navigate(`/product/${newId}`);
  };

  return (
    <div className={styles.detailsPage}>
      <Link to=".." relative="path" className={styles.detailsPage__back}>
        ‹ Back
      </Link>

      <h1 className={styles.detailsPage__title}>{details.name}</h1>

      <div className={styles.detailsPage__mainGrid}>
        <div className={styles.detailsPage__gallery}>
          <div className={styles.detailsPage__thumbnails}>
            {details.images.map(img => (
              <button
                key={img}
                type="button"
                className={`${styles.detailsPage__thumbBtn} ${
                  selectedImage === img
                    ? styles['detailsPage__thumbBtn--active']
                    : ''
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={details.name}
                  className={styles.detailsPage__thumbImg}
                />
              </button>
            ))}
          </div>

          <div className={styles.detailsPage__mainImageWrapper}>
            <img
              src={selectedImage}
              alt={details.name}
              className={styles.detailsPage__mainImg}
            />
          </div>
        </div>

        <div className={styles.detailsPage__actions}>
          <div className={styles.detailsPage__optionGroup}>
            <span className={styles.detailsPage__optionTitle}>
              Select capacity
            </span>
            <div className={styles.detailsPage__optionsList}>
              {details.capacityAvailable.map(cap => (
                <button
                  key={cap}
                  type="button"
                  className={`${styles.detailsPage__capacityBtn} ${
                    cap === details.capacity
                      ? styles['detailsPage__capacityBtn--active']
                      : ''
                  }`}
                  onClick={() => handleCapacityChange(cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.detailsPage__prices}>
            <span className={styles.detailsPage__price}>
              ${details.priceDiscount}
            </span>
            <span
              className={`${styles.detailsPage__price} ${styles['detailsPage__price--full']}`}
            >
              ${details.priceRegular}
            </span>
          </div>

          <div className={styles.detailsPage__buttons}>
            <button
              type="button"
              className={`${styles.detailsPage__addBtn} ${
                inCart ? styles['detailsPage__addBtn--added'] : ''
              }`}
              onClick={() => addToCart(product)}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={`${styles.detailsPage__favBtn} ${
                favorite ? styles['detailsPage__favBtn--active'] : ''
              }`}
              onClick={() => toggleFavorite(product)}
            >
              {favorite ? '❤️' : '🤍'}
            </button>
          </div>

          <div className={styles.detailsPage__specsBrief}>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>Screen</span>
              <span className={styles.detailsPage__specValue}>
                {details.screen}
              </span>
            </div>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>Resolution</span>
              <span className={styles.detailsPage__specValue}>
                {details.resolution}
              </span>
            </div>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>Processor</span>
              <span className={styles.detailsPage__specValue}>
                {details.processor}
              </span>
            </div>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>RAM</span>
              <span className={styles.detailsPage__specValue}>
                {details.ram}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailsPage__infoGrid}>
        <div>
          <h2 className={styles.detailsPage__sectionTitle}>About</h2>
          {details.description.map(article => (
            <div
              key={article.title}
              className={styles.detailsPage__aboutArticle}
            >
              <h3 className={styles.detailsPage__articleTitle}>
                {article.title}
              </h3>
              <p className={styles.detailsPage__articleText}>{article.text}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className={styles.detailsPage__sectionTitle}>Tech specs</h2>
          <div className={styles.detailsPage__specsBrief}>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>Screen</span>
              <span className={styles.detailsPage__specValue}>
                {details.screen}
              </span>
            </div>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>Resolution</span>
              <span className={styles.detailsPage__specValue}>
                {details.resolution}
              </span>
            </div>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>Processor</span>
              <span className={styles.detailsPage__specValue}>
                {details.processor}
              </span>
            </div>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>RAM</span>
              <span className={styles.detailsPage__specValue}>
                {details.ram}
              </span>
            </div>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>
                Built in memory
              </span>
              <span className={styles.detailsPage__specValue}>
                {details.capacity}
              </span>
            </div>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>Camera</span>
              <span className={styles.detailsPage__specValue}>
                {details.camera}
              </span>
            </div>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>Zoom</span>
              <span className={styles.detailsPage__specValue}>
                {details.zoom}
              </span>
            </div>
            <div className={styles.detailsPage__specRow}>
              <span className={styles.detailsPage__specName}>Cell</span>
              <span className={styles.detailsPage__specValue}>
                {details.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProductsSlider title="You may also like" products={suggestedProducts} />
    </div>
  );
};
