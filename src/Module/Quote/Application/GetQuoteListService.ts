import { QuoteRepositoryInterface } from '../Domain/Repository/QuoteRepositoryInterface';
import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '@/Common/Contract/TypesAssociation';

@Injectable()
export class GetQuoteListService {
  constructor(
    @Inject(TYPES.QuoteRepository)
    private readonly quoteRepository: QuoteRepositoryInterface,
  ) {}

  async getTotalQuotes(): Promise<number> {
    return await this.quoteRepository.count();
  }
}
