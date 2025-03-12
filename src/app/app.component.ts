import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './core/components/loader/loader.component';
import { AppStore } from './store/app.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  template: `
    <router-outlet />
    @if (loading()) {
      <app-loader [fullscreen]="true" [diameter]="50" message="Carregando" />
    }
  `,
})
export class AppComponent {
  private store = inject(AppStore);
  loading = this.store.isLoading;
}
