import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../../Common/Contract/TypesAssociation';
import { WelcomeUserDTO } from './Type/WelcomeUserDTO';

@Injectable()
export class WelcomeUserUseCase {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async welcome(name: string): Promise<WelcomeUserDTO | undefined> {
    const user = await this.userRepository.findByUuid(name);

    if (!user) {
      return;
    }

    return {
      message: `Hello ${user.name}`,
    };
  }
}
