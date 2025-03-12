import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinner],
  template: `
    <div class="loader-container" [class.fullscreen]="fullscreen">
      <mat-spinner [diameter]="diameter" />
      @if (message) {
        <p class="loader-message">{{ message }}</p>
      }
    </div>
  `,
  styles: [
    `
      .loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;

        &.fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.9);
          z-index: 1000;
        }
      }

      .loader-message {
        margin-top: 1rem;
        color: #666;
      }
    `,
  ],
})
export class LoaderComponent {
  @Input() fullscreen = false;
  @Input() diameter = 40;
  @Input() message?: string;
}
