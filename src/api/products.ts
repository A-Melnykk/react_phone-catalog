import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const [phonesRes, tabletsRes, accessoriesRes] = await Promise.all([
      fetch('/api/phones.json'),
      fetch('/api/tablets.json'),
      fetch('/api/accessories.json'),
    ]);

    const phones: Product[] = phonesRes.ok ? await phonesRes.json() : [];
    const tablets: Product[] = tabletsRes.ok ? await tabletsRes.json() : [];
    const accessories: Product[] = accessoriesRes.ok
      ? await accessoriesRes.json()
      : [];

    const allProducts = [...phones, ...tablets, ...accessories];

    return allProducts.map((p: Product) => ({
      ...p,
      category:
        p.category ||
        (phones.some(phone => phone.id === p.id)
          ? 'phones'
          : tablets.some(tablet => tablet.id === p.id)
            ? 'tablets'
            : 'accessories'),
      price: Number(p.price) || 0,
      fullPrice: Number(p.fullPrice) || Number(p.price) + 100 || 0,
      image: p.image.startsWith('/') ? p.image : `/${p.image}`,
    }));
  } catch {
    return [];
  }
};

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetails | null> => {
  try {
    const [phonesRes, tabletsRes, accessoriesRes] = await Promise.all([
      fetch('/api/phones.json'),
      fetch('/api/tablets.json'),
      fetch('/api/accessories.json'),
    ]);

    const phones: ProductDetails[] = phonesRes.ok ? await phonesRes.json() : [];
    const tablets: ProductDetails[] = tabletsRes.ok
      ? await tabletsRes.json()
      : [];
    const accessories: ProductDetails[] = accessoriesRes.ok
      ? await accessoriesRes.json()
      : [];

    const allDetails = [...phones, ...tablets, ...accessories];
    const found = allDetails.find(product => product.id === productId);

    if (!found) {
      return null;
    }

    return {
      ...found,
      images: found.images.map(img => (img.startsWith('/') ? img : `/${img}`)),
    };
  } catch {
    return null;
  }
};
