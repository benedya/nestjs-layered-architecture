import { TYPES } from '@/Common/Contract/TypesAssociation';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManagerService } from '@/Service/EntityManagerService';
import { UserProvider } from '@/Module/Quote/Infrastructure/Anticorruption/User/UserProvider';
import { UpdateUserService } from '@/Module/User/Application/UpdateUserService';
import { TelegramQuoteSender } from '@/Module/Quote/Infrastructure/TelegramQuoteSender';
import { GetUserService } from '@/Module/User/Application/GetUserService';

export const entityManagerProvider = {
  provide: TYPES.EntityManager,
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return new EntityManagerService(datasource);
  },
};

export const userProviderForQuote = {
  provide: TYPES.UserProvider,
  inject: [UpdateUserService, GetUserService],
  useFactory(
    updateUserService: UpdateUserService,
    userProviderService: GetUserService,
  ) {
    return new UserProvider(updateUserService, userProviderService);
  },
};

export const quoteSenderProvider = {
  provide: TYPES.QuoteSender,
  useClass: TelegramQuoteSender,
};
