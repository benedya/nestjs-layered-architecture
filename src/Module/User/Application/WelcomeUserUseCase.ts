import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../../Common/Contract/TypesAssociation';
import { WelcomeUser } from './Type/WelcomeUser';

@Injectable()
export class WelcomeUserUseCase {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async welcome(name: string): Promise<WelcomeUser | undefined> {
    const user = await this.userRepository.findByUuid(name);

    if (!user) {
      return;
    }

    return {
      message: `Hello ${user.name}`,
    };
  }
}
