import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Product } from '../../interfaces/products.interface';
import { TabConfig } from '../../interfaces/tab-config.interface';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-cards-container',
  standalone: true,
  imports: [CommonModule, MatTabsModule, ProductCardComponent],
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent {
  @Input() products: Product[] = [];
  @Output() deal = new EventEmitter<Product>();
  @Output() details = new EventEmitter<Product>();

  @Input() tabs: TabConfig[] = [
    {
      id: 'all',
      label: 'All',
      filter: (products: Product[]) => products,
    },
  ];

  getFilteredProducts(tab: TabConfig): Product[] {
    return tab.filter(this.products);
  }

  private calculateTotal(products: Product[]): number {
    return products.reduce((sum, product) => sum + (product.price || 0), 0);
  }

  getTabAmount(tab: TabConfig): number {
    return this.calculateTotal(this.getFilteredProducts(tab));
  }

  onDeal(product: Product) {
    this.deal.emit(product);
  }

  onDetails(product: Product) {
    this.details.emit(product);
  }
}
