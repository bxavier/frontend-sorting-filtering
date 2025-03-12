import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: unknown): string {
    let message = 'An unexpected error occurred';

    if (error instanceof Error) {
      message = error.message;
    }

    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });

    return message;
  }
}
