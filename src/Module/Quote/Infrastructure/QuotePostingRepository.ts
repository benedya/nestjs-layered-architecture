import { QuotePostingRepositoryInterface } from '../Domain/Repository/QuotePostingRepositoryInterface';
import { QuotePosting } from '../Domain/Entity/QuotePosting';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuotePostingRepository
  extends Repository<QuotePosting>
  implements QuotePostingRepositoryInterface
{
  constructor(dataSource: DataSource) {
    super(QuotePosting, dataSource.createEntityManager());
  }

  async findByQuoteId(quoteId: number): Promise<QuotePosting | undefined> {
    return this.findOne({
      where: {
        quoteId,
      },
    });
  }

  async findById(id: number): Promise<QuotePosting | undefined> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
