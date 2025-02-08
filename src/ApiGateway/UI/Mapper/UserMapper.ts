import { UserDetails } from '../Type/UserDetails';
import { UserShort } from '../../../Module/User/Application/Type/UserShort';

export class UserMapper {
  static toUserDetails(user: UserShort): UserDetails {
    return {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
    };
  }
}
