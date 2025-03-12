import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

interface AppState {
  loading: boolean;
}

const initialState: AppState = {
  loading: true,
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setLoading(loading: boolean) {
      patchState(store, { loading });
    },
  })),
  withComputed(({ loading }) => ({
    isLoading: computed(() => loading()),
  })),
);
