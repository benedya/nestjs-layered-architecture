import { UserRepositoryInterface } from '../Domain/Repository/UserRepositoryInterface';
import { User } from '../Domain/Entity/User';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository
  extends Repository<User>
  implements UserRepositoryInterface
{
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByUuid(uuid: string): Promise<User | undefined> {
    return this.findOne({
      where: {
        uuid,
      },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.find();
  }
}
