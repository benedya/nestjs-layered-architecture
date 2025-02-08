import { UserShort } from './UserShort';

export interface UserFull extends UserShort {
  emailNotificationsEnabled: boolean;
  createdAt: Date;
}
