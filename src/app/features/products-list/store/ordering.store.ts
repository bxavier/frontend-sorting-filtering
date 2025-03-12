import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { environment } from '../../../../environments/environment';
import { Product } from '../interfaces/products.interface';
import { OrderItem } from '../interfaces/order-item.interface';

interface OrderingState {
  productsList: OrderItem[];
}

// Initial ordering configuration
const initialState: OrderingState = {
  productsList: [
    { id: 'name', label: 'Sort by Name', direction: 'asc', type: 'string' },
    { id: 'price', label: 'Sort by Value', direction: 'asc', type: 'number' },
    { id: 'id', label: 'Sort by ID', direction: 'asc', type: 'string' },
    { id: 'rating', label: 'Sort by Rating', direction: 'asc', type: 'number' },
  ],
};

const withDevTools = environment.storeWithDevtools;

export const OrderingStore = signalStore(
  { providedIn: 'root' },
  withDevTools('OrderingStore'),
  withState(initialState),
  withComputed((state) => ({
    // Get the current ordering items
    productsListItems: computed(() => state.productsList()),

    // Transform the items into ordering parameters
    productsListParams: computed(() =>
      state.productsList().map((item) => ({
        orderCriteria: item.id as keyof Product,
        orderDirection: item.direction,
      })),
    ),
  })),
  withMethods((store) => ({
    updateOrdering(type: keyof OrderingState, items: OrderItem[]) {
      patchState(store, { [type]: items });
    },
    resetOrdering(type: keyof OrderingState) {
      patchState(store, { [type]: initialState[type] });
    },
    resetAll() {
      patchState(store, initialState);
    },
  })),
);
