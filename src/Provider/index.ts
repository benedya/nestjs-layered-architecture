import {
  entityManagerProvider,
  quoteSenderProvider,
  userProviderForQuote,
} from './service-provider';
import {
  userRepositoryProvider,
  quoteRepositoryProvider,
  quotePostingRepositoryProvider,
} from './repository-provider';

export const PROVIDERS = [
  entityManagerProvider,
  userRepositoryProvider,
  quoteRepositoryProvider,
  quotePostingRepositoryProvider,
  quoteSenderProvider,
  userProviderForQuote,
] as const;
