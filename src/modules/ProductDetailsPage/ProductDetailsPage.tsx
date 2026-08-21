import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { getProductDetails, getProducts } from '../../api/products';
import { Loader } from '../../components/Loader';
import { NotFoundPage } from '../NotFoundPage';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './ProductDetailsPage.module.scss';

const BASE_URL = import.meta.env.BASE_URL || '/';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setIsError(false);

    Promise.all([getProductDetails(productId), getProducts()])
      .then(([fetchedDetails, allProducts]) => {
        if (!fetchedDetails) {
          setIsError(true);

          return;
        }

        setDetails(fetchedDetails);
        setSelectedImage(fetchedDetails.images[0] || '');
        setSuggestedProducts(allProducts);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !details) {
    return <NotFoundPage />;
  }

  const getFullImgPath = (path: string) => {
    return path.startsWith('http') ? path : `${BASE_URL}${path}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/">Home</Link> &gt; <Link to="/phones">Phones</Link> &gt;{' '}
        <span>{details.name}</span>
      </div>

      <button
        type="button"
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      >
        &lt; Back
      </button>

      <h1 className={styles.title}>{details.name}</h1>

      <div className={styles.mainContent}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {details.images.map((img, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.thumbBtn} ${
                  selectedImage === img ? styles['thumbBtn--active'] : ''
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={getFullImgPath(img)}
                  alt={`${details.name} ${index}`}
                />
              </button>
            ))}
          </div>
          <div className={styles.mainImageContainer}>
            <img src={getFullImgPath(selectedImage)} alt={details.name} />
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.optionSection}>
            <span className={styles.optionLabel}>Available colors</span>
            <div className={styles.colors}>
              {details.colorsAvailable.map(color => (
                <Link
                  key={color}
                  to={`/product/${details.namespaceId}-${details.capacity.toLowerCase()}-${color}`}
                  className={`${styles.colorCircle} ${
                    color === details.color ? styles['colorCircle--active'] : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className={styles.optionSection}>
            <span className={styles.optionLabel}>Select capacity</span>
            <div className={styles.capacities}>
              {details.capacityAvailable.map(cap => (
                <Link
                  key={cap}
                  to={`/product/${details.namespaceId}-${cap.toLowerCase()}-${details.color}`}
                  className={`${styles.capacityBtn} ${
                    cap === details.capacity
                      ? styles['capacityBtn--active']
                      : ''
                  }`}
                >
                  {cap}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.priceDiscount}>
              ${details.priceDiscount}
            </span>
            <span className={styles.priceRegular}>${details.priceRegular}</span>
          </div>

          <div className={styles.buttons}>
            <button type="button" className={styles.addToCartBtn}>
              Add to cart
            </button>
            <button type="button" className={styles.favBtn}>
              ♡
            </button>
          </div>

          <div className={styles.quickSpecs}>
            <div className={styles.specRow}>
              <span>Screen</span>
              <span>{details.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span>Resolution</span>
              <span>{details.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span>Processor</span>
              <span>{details.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span>RAM</span>
              <span>{details.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.about}>
          <h2>About</h2>
          {details.description.map((paragraph, idx) => (
            <div key={idx} className={styles.paragraph}>
              <h3>{paragraph.title}</h3>
              <p>{paragraph.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2>Tech specs</h2>
          <div className={styles.specRow}>
            <span>Screen</span>
            <span>{details.screen}</span>
          </div>
          <div className={styles.specRow}>
            <span>Resolution</span>
            <span>{details.resolution}</span>
          </div>
          <div className={styles.specRow}>
            <span>Processor</span>
            <span>{details.processor}</span>
          </div>
          <div className={styles.specRow}>
            <span>RAM</span>
            <span>{details.ram}</span>
          </div>
          <div className={styles.specRow}>
            <span>Built in memory</span>
            <span>{details.capacity}</span>
          </div>
          <div className={styles.specRow}>
            <span>Camera</span>
            <span>{details.camera}</span>
          </div>
          <div className={styles.specRow}>
            <span>Zoom</span>
            <span>{details.zoom}</span>
          </div>
          <div className={styles.specRow}>
            <span>Cell</span>
            <span>{details.cell.join(', ')}</span>
          </div>
        </div>
      </div>

      {suggestedProducts.length > 0 && (
        <div className={styles.sliderSection}>
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </div>
      )}
    </div>
  );
};
