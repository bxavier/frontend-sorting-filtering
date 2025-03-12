import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { environment } from '../../../../environments/environment';
import { Product, ProductsApiResponse } from '../interfaces/products.interface';
import { ProductsService } from '../services/products.service';
import { Company } from '../interfaces/companies.interface';

export interface OrderingCriteria {
  orderCriteria: keyof Product;
  orderDirection?: 'asc' | 'desc';
}

export interface ProductsState {
  products: ProductsApiResponse;
  fetchedProducts: ProductsApiResponse;
}

const initialProducts: ProductsApiResponse = {
  products: [],
  queryTime: '',
};

const initialState: ProductsState = {
  products: initialProducts,
  fetchedProducts: initialProducts,
};

const withDevTools = environment.storeWithDevtools;

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withDevTools('ProductsStore'),
  withState(initialState),
  withComputed((store) => ({
    // Get unique companies from products
    uniqueCompanies: computed(() => {
      const products = store.fetchedProducts().products;
      const companyMap = new Map<string, Company>();

      products.forEach((product) => {
        if (product.manufacturer && product.document) {
          companyMap.set(product.document, {
            name: product.manufacturer,
            documentNumber: product.document,
          });
        }
      });

      return Array.from(companyMap.values());
    }),
  })),
  withMethods((store, productsService = inject(ProductsService)) => {
    return {
      async loadProducts() {
        try {
          const response = await productsService.getProducts();
          patchState(store, {
            products: response,
            fetchedProducts: response,
          });
        } catch (error) {
          console.error('Failed to load products:', error);
          // Set products to empty arrays to prevent UI errors
          patchState(store, {
            products: initialProducts,
            fetchedProducts: initialProducts,
          });
        }
      },

      resetProducts() {
        patchState(store, { products: store.fetchedProducts() });
      },

      orderItems(orderings: OrderingCriteria[]) {
        if (!orderings || orderings.length === 0) {
          return; // No ordering to apply
        }

        console.log('Ordering with:', orderings);
        const products = [...store.products().products].sort((a, b) => {
          for (const { orderCriteria, orderDirection = 'asc' } of orderings) {
            const aValue = a[orderCriteria] ?? '';
            const bValue = b[orderCriteria] ?? '';
            if (aValue > bValue) return orderDirection === 'asc' ? 1 : -1;
            if (aValue < bValue) return orderDirection === 'asc' ? -1 : 1;
          }
          return 0;
        });

        patchState(store, {
          products: {
            ...store.products(),
            products,
          },
        });
      },

      filterItems(filterKey: keyof Product, filterValue: string) {
        const products = store.products().products.filter((product) => product[filterKey] === filterValue);
        patchState(store, { products: { ...store.products(), products } });
      },

      // Update products with filtered results from FiltersStore
      updateFilteredProducts(filteredProducts: Product[]) {
        patchState(store, {
          products: {
            ...store.products(),
            products: filteredProducts,
          },
        });
      },
    };
  }),
);
