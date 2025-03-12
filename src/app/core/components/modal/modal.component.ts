import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent<T> implements OnInit {
  @ViewChild('content', { read: ViewContainerRef, static: true }) content!: ViewContainerRef;
  @Input() title = '';
  @Input() showCloseButton = true;
  @Output() close = new EventEmitter<void>();

  constructor(
    private dialogRef: MatDialogRef<ModalComponent<T>>,
    @Inject(MAT_DIALOG_DATA) private data: { component: Type<T>; data: T },
  ) {}

  ngOnInit() {
    const componentRef = this.content.createComponent(this.data.component);
    Object.assign(componentRef.instance as object, this.data.data);
  }

  onClose() {
    this.dialogRef.close();
    this.close.emit();
  }
}
