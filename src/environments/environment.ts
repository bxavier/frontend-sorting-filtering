import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const environment = {
  production: false,
  useMocks: true,
  api: {
    backend: 'http://localhost:3333/api/v2',
  },
  storeWithDevtools: withDevtools,
};
