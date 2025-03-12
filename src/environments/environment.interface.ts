export interface Environment {
  production: boolean;
  useMocks: boolean;
  api: {
    backend: string;
  };
}
