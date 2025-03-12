import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AppStore } from '../../../store/app.store';
import { ProductsApiResponse } from '../interfaces/products.interface';
import { MOCK_PRODUCTS } from '../../../mocks';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private appStore = inject(AppStore);

  async getProducts(): Promise<ProductsApiResponse> {
    this.appStore.setLoading(true);
    try {
      // Use mock data if useMocks is enabled in environment
      if (environment.useMocks) {
        // Simulate network delay to make the app feel more realistic
        await new Promise((resolve) => setTimeout(resolve, 500));
        return MOCK_PRODUCTS;
      }

      // Otherwise use real API
      const response = await fetch(`${environment.api.backend}/products`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.appStore.setLoading(false);
    }
  }
}
