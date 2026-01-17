import { UserData } from '../Type/UserData';

export interface UserProviderInterface {
  findUserById(userId: number): Promise<UserData | undefined>;
  updateUserLastPostedAt(userId: number, lastPostedAt: Date): Promise<void>;
}
