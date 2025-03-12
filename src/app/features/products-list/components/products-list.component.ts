import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OrderingComponent } from './ordering-wrapper/ordering.component';
import { Product } from '../interfaces/products.interface';
import { OrderItem } from '../interfaces/order-item.interface';
import { TabConfig } from '../interfaces/tab-config.interface';
import { ProductsStore } from '../store/products.store';
import { OrderingStore } from '../store/ordering.store';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { FiltersComponent } from './filters/filters.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    CardsContainerComponent,
    OrderingComponent,
    FiltersComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  private store = inject(ProductsStore);
  products = () => this.store.products();

  orderingStore = inject(OrderingStore);

  customTabs: TabConfig[] = [
    {
      id: 'all',
      label: 'All',
      filter: (products: Product[]) => products,
    },
    {
      id: 'discount',
      label: 'With discount',
      filter: (products: Product[]) => products.filter((product) => product.discount > 0),
    },
    {
      id: 'high_rating',
      label: 'High rating',
      filter: (products: Product[]) => products.filter((product) => product.rating > 4),
    },
    {
      id: 'in_stock',
      label: 'In stock',
      filter: (products: Product[]) => products.filter((product) => product.inStock),
    },
    {
      id: 'inactive',
      label: 'Inactive',
      filter: (products: Product[]) => products.filter((product) => product.status === 'INACTIVE'),
    },
  ];

  constructor() {}

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    return this.store.loadProducts();
  }

  orderItems(orderings: { orderCriteria: keyof Product; orderDirection?: 'asc' | 'desc' }[]) {
    this.store.orderItems(orderings);
  }

  resetProducts() {
    this.store.resetProducts();
  }

  onOrderingChanged(params: OrderItem[]) {
    this.orderingStore.updateOrdering('productsList', params);
    this.orderItems(this.orderingStore.productsListParams());
  }

  handleDeal(product: Product) {
    // Handle deal action using the store or service
    console.log('Deal:', product);
  }

  handleDetails(product: Product) {
    // Handle details action, maybe open a modal
    console.log('Show details:', product);
  }
}
