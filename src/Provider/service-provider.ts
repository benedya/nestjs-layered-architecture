import { TYPES } from '../Common/Contract/TypesAssociation';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManagerService } from '../Service/EntityManagerService';
import { UserNotificationsSettingsProvider } from '../Module/Notification/Infrastructure/Anticorruption/User/UserNotificationsSettingsProvider';

export const entityManagerProvider = {
  provide: TYPES.EntityManager,
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return new EntityManagerService(datasource);
  },
};

export const userNotificationsSettingsProvider = {
  provide: TYPES.UserNotificationsSettingsProvider,
  useClass: UserNotificationsSettingsProvider,
};
