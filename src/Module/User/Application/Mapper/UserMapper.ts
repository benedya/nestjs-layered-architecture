import { User } from '../../Domain/Entity/User';
import { UserFull } from '../Type/UserFull';
import { UserShort } from '../Type/UserShort';

export class UserMapper {
  public static toShort(user: User): UserShort {
    return {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
    };
  }

  public static toFull(user: User): UserFull {
    return {
      ...this.toShort(user),
      emailNotificationsEnabled: user.emailNotificationsEnabled,
      createdAt: user.createdAt,
    };
  }
}
