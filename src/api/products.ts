import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const BASE_URL = './api';

function request<T>(url: string): Promise<T> {
  return fetch(`${BASE_URL}${url}`).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  });
}

export const getProducts = () => request<Product[]>('/products.json');

export const getProductDetails = (productId: string) =>
  request<ProductDetails[]>(`/${productId}.json`).then(
    products => products.find(p => p.id === productId) || null,
  );
