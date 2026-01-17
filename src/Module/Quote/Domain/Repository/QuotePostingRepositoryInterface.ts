import { QuotePosting } from '../Entity/QuotePosting';

export interface QuotePostingRepositoryInterface {
  findByQuoteId(quoteId: number): Promise<QuotePosting | undefined>;
  findById(id: number): Promise<QuotePosting | undefined>;
}
