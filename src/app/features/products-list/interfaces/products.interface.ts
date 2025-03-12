export interface ProductsApiResponse {
  queryTime: string;
  products: Product[];
}

export interface Product {
  id: string;
  price: number;
  dueDate: string;
  rating: number;
  manufacturer: string;
  document: string;
  discount: number;
  name: string;
  description: string;
  image: string;
  categories: string[];
  status: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}
