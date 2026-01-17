import { QuoteRepositoryInterface } from '../Domain/Repository/QuoteRepositoryInterface';
import { Quote } from '../Domain/Entity/Quote';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { QuotePosting } from '../Domain/Entity/QuotePosting';
import { DateTime } from 'luxon';

@Injectable()
export class QuoteRepository
  extends Repository<Quote>
  implements QuoteRepositoryInterface
{
  constructor(dataSource: DataSource) {
    super(Quote, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Quote | undefined> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async findOneForPosting(): Promise<Quote | undefined> {
    const yesterdayNight = DateTime.now()
      .minus({ days: 1 })
      .endOf('day')
      .toJSDate();

    return (
      this.createQueryBuilder('q')
        .innerJoin('user', 'u', 'q.userId = u.id')
        .leftJoin(QuotePosting, 'qp', 'qp.quoteId = q.id')
        .addSelect('COALESCE(qp.postCount, 0)', 'post_count_order')
        .where('u.isActive = :isActive', { isActive: true })
        .andWhere(
          '(u.lastPostedAt IS NULL OR u.lastPostedAt <= :yesterdayNight)',
          {
            yesterdayNight,
          },
        )
        .orderBy('post_count_order', 'ASC')
        // .addOrderBy('q.id', 'ASC')
        .take(1)
        .getOne()
    );
  }

  async count(): Promise<number> {
    return this.createQueryBuilder('q').getCount();
  }
}
