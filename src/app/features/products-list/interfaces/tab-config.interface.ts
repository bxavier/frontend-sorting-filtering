import { Product } from './products.interface';

export interface TabConfig {
  id: string;
  label: string;
  filter: (products: Product[]) => Product[];
}
