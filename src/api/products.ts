import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const BASE_URL = `${import.meta.env.BASE_URL || '/'}api`;

function request<T>(url: string): Promise<T> {
  return fetch(`${BASE_URL}${url}`).then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    return response.json();
  });
}

export const getProducts = () => request<Product[]>('/products.json');

export const getProductDetails = (
  productId: string,
): Promise<ProductDetails | null> => {
  return Promise.all([
    request<ProductDetails[]>('/phones.json').catch(() => []),
    request<ProductDetails[]>('/tablets.json').catch(() => []),
    request<ProductDetails[]>('/accessories.json').catch(() => []),
  ]).then(([phones, tablets, accessories]) => {
    const allDetails = [...phones, ...tablets, ...accessories];

    return allDetails.find(item => item.id === productId) || null;
  });
};
