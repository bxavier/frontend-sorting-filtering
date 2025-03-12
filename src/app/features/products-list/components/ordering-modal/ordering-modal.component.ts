import { A11yModule, FocusMonitor } from '@angular/cdk/a11y';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OrderItem } from '../../interfaces/order-item.interface';
import { DirectionToggleComponent } from './direction-toggle/direction-toggle.component';

@Component({
  selector: 'app-ordering-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    DirectionToggleComponent,
    MatDialogModule,
    A11yModule,
  ],
  templateUrl: './ordering-modal.component.html',
  styleUrls: ['./ordering-modal.component.scss'],
})
export class OrderingModalComponent implements OnInit, OnDestroy {
  private dialogData = inject(MAT_DIALOG_DATA) as { data: OrderItem[] };
  private focusMonitor = inject(FocusMonitor);
  private elementRef = inject(ElementRef);

  items = signal<OrderItem[]>([]);

  constructor(private dialogRef: MatDialogRef<OrderingModalComponent, OrderItem[]>) {}

  ngOnInit(): void {
    this.items.set(this.dialogData.data);
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  drop(event: CdkDragDrop<OrderItem[]>): void {
    const updatedItems = [...this.items()];
    moveItemInArray(updatedItems, event.previousIndex, event.currentIndex);
    this.items.set(updatedItems);
  }

  toggleDirection(index: number): void {
    const updatedItems = [...this.items()];
    updatedItems[index] = {
      ...updatedItems[index],
      direction: updatedItems[index].direction === 'asc' ? 'desc' : 'asc',
    };
    this.items.set(updatedItems);
  }

  applyOrder(): void {
    this.dialogRef.close(this.items());
  }
}
