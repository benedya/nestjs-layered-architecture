import { entityManagerProvider } from './service-provider';
import { userRepositoryProvider } from './repository-provider';

export const PROVIDERS = [
  entityManagerProvider,
  userRepositoryProvider,
] as const;
