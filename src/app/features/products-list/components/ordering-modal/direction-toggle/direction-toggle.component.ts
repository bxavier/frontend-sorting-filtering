import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderItem } from '../../../interfaces/order-item.interface';

@Component({
  selector: 'app-direction-toggle',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './direction-toggle.component.html',
  styleUrls: ['./direction-toggle.component.scss'],
})
export class DirectionToggleComponent {
  @Input({ required: true }) type!: OrderItem['type'];
  @Input({ required: true }) direction!: OrderItem['direction'];
  @Input({ required: true }) label!: string;
  @Output() directionChange = new EventEmitter<void>();

  private readonly directionLabels = {
    string: { asc: 'A-Z', desc: 'Z-A' },
    number: { asc: '0-9', desc: '9-0' },
  } as const;

  getDirectionText(): string {
    return this.directionLabels[this.type][this.direction];
  }
}
