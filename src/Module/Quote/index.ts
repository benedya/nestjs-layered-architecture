import { GetQuoteListService } from './Application/GetQuoteListService';
import { CreateQuoteService } from './Application/CreateQuoteService';
import { PostQuoteService } from './Application/PostQuoteService';
import { UserProvider } from './Infrastructure/Anticorruption/User/UserProvider';

export const SERVICES = [
  GetQuoteListService,
  CreateQuoteService,
  PostQuoteService,
  UserProvider,
] as const;
