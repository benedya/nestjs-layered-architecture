import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../../Constant/TypesAssociation';
import { WelcomeUserDTO } from './Type/WelcomeUserDTO';

@Injectable()
export class WelcomeUserUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(
    @Inject(TYPES.UserRepository) userRepository: UserRepositoryInterface,
  ) {
    this.userRepository = userRepository;
  }

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
