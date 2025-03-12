import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { environment } from '../../environments/environment';

interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: false,
};

const withDevTools = environment.storeWithDevtools;

export const AppStore = signalStore(
  { providedIn: 'root' },
  withDevTools('AppStore'),
  withState(initialState),
  withMethods((store) => ({
    setLoading(loading: boolean) {
      patchState(store, { isLoading: loading });
    },
  })),
  withComputed(({ isLoading }) => ({
    isLoading: computed(() => isLoading()),
  })),
);
