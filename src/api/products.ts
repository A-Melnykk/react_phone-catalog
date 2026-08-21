import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const rawBase = import.meta.env.BASE_URL || '/';
const normalizedBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

function request<T>(url: string): Promise<T> {
  return fetch(`${normalizedBase}${url}`).then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    return response.json();
  });
}

export const getProducts = () => request<Product[]>('api/products.json');

export const getProductDetails = (
  productId: string,
): Promise<ProductDetails | null> => {
  return Promise.all([
    request<ProductDetails[]>('api/phones.json').catch(() => []),
    request<ProductDetails[]>('api/tablets.json').catch(() => []),
    request<ProductDetails[]>('api/accessories.json').catch(() => []),
  ]).then(([phones, tablets, accessories]) => {
    const allDetails = [...phones, ...tablets, ...accessories];

    return allDetails.find(item => item.id === productId) || null;
  });
};
