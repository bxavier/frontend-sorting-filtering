import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { environment } from '../../../../environments/environment';
import { Company } from '../interfaces/companies.interface';
import { Product } from '../interfaces/products.interface';
import { ProductsStore } from './products.store';

export interface FiltersState {
  companies: Company[];
  value: { min: number; max: number };
  status: string[];
}

const initialFilters: FiltersState = {
  companies: [],
  value: {
    min: 0,
    max: 100000,
  },
  status: [],
};

const withDevTools = environment.storeWithDevtools;

export const FiltersStore = signalStore(
  { providedIn: 'root' },
  withDevTools('FiltersStore'),
  withState(initialFilters),
  withComputed((store) => ({
    // Returns whether any filter is active
    hasActiveFilters: computed(() => {
      const { companies, value, status } = store;
      return companies().length > 0 || value().min > 0 || value().max < 100000 || status().length > 0;
    }),
  })),
  withMethods((store) => {
    const productsStore = inject(ProductsStore);

    return {
      // Update any part of the filters
      updateFilters(filterUpdate: Partial<FiltersState>) {
        patchState(store, {
          ...filterUpdate,
        });
      },

      // Apply the current filters to the products
      applyFilters() {
        const filteredProducts = this.getFilteredProducts();
        // Use bracket notation to access the method on productsStore
        productsStore['updateFilteredProducts'](filteredProducts);
      },

      // Get filtered products based on current filters
      getFilteredProducts() {
        const products = productsStore.fetchedProducts().products;
        const { companies, value, status } = store;

        return products.filter((product) => {
          // Filter by company
          if (companies().length > 0 && !companies().some((company) => company.documentNumber === product.document)) {
            return false;
          }

          // Filter by price
          if (product.price < value().min || product.price > value().max) {
            return false;
          }

          // Filter by status
          if (status().length > 0 && !status().includes(product.status)) {
            return false;
          }

          return true;
        });
      },

      // Reset filters to initial state
      resetFilters() {
        patchState(store, initialFilters);
      },
    };
  }),
);
