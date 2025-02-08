import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../../Common/Contract/TypesAssociation';
import { UserFull } from './Type/UserFull';
import { UserMapper } from './Mapper/UserMapper';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async findUserByUuid(uuid: string): Promise<UserFull | undefined> {
    const user = await this.userRepository.findByUuid(uuid);

    if (!user) {
      return;
    }

    return UserMapper.toFull(user);
  }
}
