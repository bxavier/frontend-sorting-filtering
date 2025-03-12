import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../interfaces/products.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() deal = new EventEmitter<Product>();
  @Output() details = new EventEmitter<Product>();

  onDeal(): void {
    this.deal.emit(this.product);
  }

  onDetails(): void {
    this.details.emit(this.product);
  }
}
