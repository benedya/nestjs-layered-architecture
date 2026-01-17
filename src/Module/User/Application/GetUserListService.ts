import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '@/Common/Contract/TypesAssociation';
import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';

@Injectable()
export class GetUserListService {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async getTotalUsers(): Promise<number> {
    return await this.userRepository.count();
  }
}
