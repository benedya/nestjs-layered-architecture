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

  async findById(id: number): Promise<User | undefined> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async findByMessengerId(messengerId: string): Promise<User | undefined> {
    return this.findOne({
      where: {
        messengerId,
      },
    });
  }

  async count(): Promise<number> {
    return this.createQueryBuilder('u').getCount();
  }
}
