import { TYPES } from '../Common/Contract/TypesAssociation';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserRepository } from '../Module/User/Infrastructure/UserRepository';

export const userRepositoryProvider = {
  provide: TYPES.UserRepository,
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return new UserRepository(datasource);
  },
};
