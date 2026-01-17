import { User } from '../../Domain/Entity/User';
import { UserDTO } from '../Type/UserDTO';

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      messengerId: user.messengerId,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
  }
}
