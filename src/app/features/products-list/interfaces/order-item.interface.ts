import { OrderCriteria } from './order-criteria.interface';

export interface OrderItem {
  readonly id: OrderCriteria['orderCriteria'];
  readonly label: string;
  direction: OrderCriteria['orderDirection'];
  type: 'string' | 'number';
}
