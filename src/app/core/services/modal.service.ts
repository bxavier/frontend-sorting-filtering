import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dialog = inject(MatDialog);

  open<T, R = unknown>(config: {
    component: ComponentType<T>;
    title?: string;
    width?: string;
    data?: unknown;
  }): MatDialogRef<ModalComponent<T>, R> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = config.width;
    dialogConfig.data = {
      component: config.component,
      data: config.data,
    };
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = true;
    dialogConfig.ariaLabel = config.title;
    // Prevent aria-hidden from being applied to app-root
    dialogConfig.panelClass = 'modal-dialog';
    // Ensure proper focus management
    dialogConfig.closeOnNavigation = true;

    const dialogRef = this.dialog.open<ModalComponent<T>, R>(ModalComponent, dialogConfig as MatDialogConfig<R>);
    const modalInstance = dialogRef.componentInstance;
    modalInstance.title = config.title || '';

    return dialogRef;
  }

  close() {
    this.dialog.closeAll();
  }
}
