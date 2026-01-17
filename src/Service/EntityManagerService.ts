import { DataSource } from 'typeorm';
import { EntityManagerInterface } from '@/Common/Contract/EntityManagerInterface';

export class EntityManagerService implements EntityManagerInterface {
  constructor(private readonly dataSource: DataSource) {}

  async transaction(...entities: object[]): Promise<void> {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(entities);
    });
  }
}
