import { User } from '../Entity/User';

export interface UserRepositoryInterface {
  findById(id: number): Promise<User | undefined>;
  findByMessengerId(messengerId: string): Promise<User | undefined>;
  count(): Promise<number>;
}
