import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '../../../../core/services/modal.service';
import { OrderingModalComponent } from '../ordering-modal/ordering-modal.component';
import { OrderItem } from '../../interfaces/order-item.interface';

@Component({
  selector: 'app-ordering',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `<ng-content></ng-content>`,
  host: {
    class: 'ordering',
    '(click)': 'openOrderingModal()',
  },
})
export class OrderingComponent {
  @Input() items: OrderItem[] = [];
  @Input() modalTitle = 'Sort';
  @Output() orderingChanged = new EventEmitter<OrderItem[]>();

  private modalService = inject(ModalService);

  openOrderingModal() {
    const dialogRef = this.modalService.open<OrderingModalComponent, OrderItem[]>({
      component: OrderingModalComponent,
      title: this.modalTitle,
      width: '600px',
      data: this.items,
    });

    dialogRef.afterClosed().subscribe((result: OrderItem[] | undefined) => {
      if (result) this.orderingChanged.emit(result);
    });
  }
}
