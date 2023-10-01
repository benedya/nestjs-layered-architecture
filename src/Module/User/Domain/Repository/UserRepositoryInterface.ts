import { User } from '../Entity/User';

export interface UserRepositoryInterface {
  findByUuid(uuid: string): Promise<User | undefined>;
  save(entity: User): Promise<void>;
}
