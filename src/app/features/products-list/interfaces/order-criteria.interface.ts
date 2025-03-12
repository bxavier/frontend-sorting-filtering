import { Product } from './products.interface';

export interface OrderCriteria {
  orderCriteria: keyof Product;
  orderDirection: 'asc' | 'desc';
}
