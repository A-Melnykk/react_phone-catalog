import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails, getProducts } from '../../api/products';
import { Loader } from '../../components/Loader';
import { NotFoundPage } from '../NotFoundPage';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
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

        const foundProduct = allProducts.find(
          p =>
            p.itemId === fetchedDetails.id ||
            String(p.id) === fetchedDetails.id,
        );

        if (foundProduct) {
          setProduct(foundProduct);
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !details || !product) {
    return <NotFoundPage />;
  }

  return (
    <div className="product-details-page">
      <h1>{details.name}</h1>
    </div>
  );
};
