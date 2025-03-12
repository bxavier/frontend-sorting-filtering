import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Company } from '../../interfaces/companies.interface';
import { CompanyFilterComponent } from './company-filter/company-filter.component';
import { ProductsStore } from '../../store/products.store';
import { OrderingStore } from '../../store/ordering.store';
import { FiltersStore } from '../../store/filters.store';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    CompanyFilterComponent,
  ],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  private productsStore = inject(ProductsStore);
  private orderingStore = inject(OrderingStore);
  private filtersStore = inject(FiltersStore);

  // Get companies from the ProductsStore
  get companies(): Company[] {
    return this.productsStore.uniqueCompanies();
  }

  // Get current filters from store
  get filters() {
    return {
      companies: this.filtersStore.companies(),
      value: this.filtersStore.value(),
      status: this.filtersStore.status(),
    };
  }

  // Status options for checkboxes
  statusOptions = ['ACTIVE', 'INACTIVE'];

  updateMinValue(event: Event): void {
    const min = +(event.target as HTMLInputElement).value;
    this.filtersStore.updateFilters({
      value: {
        ...this.filters.value,
        min,
      },
    });
  }

  updateMaxValue(event: Event): void {
    const max = +(event.target as HTMLInputElement).value;
    this.filtersStore.updateFilters({
      value: {
        ...this.filters.value,
        max,
      },
    });
  }

  updateStatus(status: string, isChecked: boolean): void {
    let currentStatus = [...this.filters.status];

    if (isChecked && !currentStatus.includes(status)) {
      currentStatus.push(status);
    } else if (!isChecked && currentStatus.includes(status)) {
      currentStatus = currentStatus.filter((s) => s !== status);
    }

    this.filtersStore.updateFilters({ status: currentStatus });
  }

  applyFilters(): void {
    // First apply the filters
    this.filtersStore.applyFilters();

    // Then reapply any existing ordering
    const currentOrderingParams = this.orderingStore.productsListParams();
    if (currentOrderingParams && currentOrderingParams.length > 0) {
      this.productsStore.orderItems(currentOrderingParams);
    }
  }

  clearFilters(): void {
    // Reset filters
    this.filtersStore.resetFilters();
    this.productsStore.resetProducts();

    // Reapply any existing ordering
    const currentOrderingParams = this.orderingStore.productsListParams();
    if (currentOrderingParams && currentOrderingParams.length > 0) {
      this.productsStore.orderItems(currentOrderingParams);
    }
  }
}
