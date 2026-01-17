import { Inject, Injectable, Logger } from '@nestjs/common';
import { TYPES } from '@/Common/Contract/TypesAssociation';
import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { EntityManagerInterface } from '@/Common/Contract/EntityManagerInterface';

@Injectable()
export class UpdateUserService {
  private readonly logger = new Logger(UpdateUserService.name);

  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
    @Inject(TYPES.EntityManager)
    private readonly entityManager: EntityManagerInterface,
  ) {}

  async updateUserLastPostedAt(
    userId: number,
    lastPostedAt: Date,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      this.logger.warn(`User not found for userId=${userId}`);
      return;
    }

    user.lastPostedAt = lastPostedAt;
    await this.entityManager.transaction(user);
  }
}
