import { TYPES } from '../Contract/TypesAssociation';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManagerService } from '../Service/EntityManagerService';

export const entityManagerProvider = {
  provide: TYPES.EntityManager,
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return new EntityManagerService(datasource);
  },
};
