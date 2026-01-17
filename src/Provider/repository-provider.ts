import { TYPES } from '@/Common/Contract/TypesAssociation';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserRepository } from '@/Module/User/Infrastructure/UserRepository';
import { QuoteRepository } from '@/Module/Quote/Infrastructure/QuoteRepository';
import { QuotePostingRepository } from '@/Module/Quote/Infrastructure/QuotePostingRepository';

export const userRepositoryProvider = {
  provide: TYPES.UserRepository,
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return new UserRepository(datasource);
  },
};

export const quoteRepositoryProvider = {
  provide: TYPES.QuoteRepository,
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return new QuoteRepository(datasource);
  },
};

export const quotePostingRepositoryProvider = {
  provide: TYPES.QuotePostingRepository,
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return new QuotePostingRepository(datasource);
  },
};
