import { Injectable } from '@nestjs/common';
import { UserProviderInterface } from '../../../Application/Contract/UserProviderInterface';
import { UpdateUserService } from '@/Module/User/Application/UpdateUserService';
import { UserData } from '@/Module/Quote/Application/Type/UserData';
import { GetUserService } from '@/Module/User/Application/GetUserService';

/**
 * Anticorruption layer between Quote and User modules.
 * Isolates Quote module from User module implementation details.
 * Uses User module's application services to maintain clean boundaries.
 */
@Injectable()
export class UserProvider implements UserProviderInterface {
  constructor(
    private readonly updateUserService: UpdateUserService,
    private readonly userProviderService: GetUserService,
  ) {}

  async findUserById(userId: number): Promise<UserData | undefined> {
    const user = await this.userProviderService.findUserById(userId);

    if (!user) {
      return;
    }

    // Map to DTO specific to Quote module's needs
    return {
      id: user.id,
      messengerId: user.messengerId,
    };
  }

  async updateUserLastPostedAt(
    userId: number,
    lastPostedAt: Date,
  ): Promise<void> {
    await this.updateUserService.updateUserLastPostedAt(userId, lastPostedAt);
  }
}
