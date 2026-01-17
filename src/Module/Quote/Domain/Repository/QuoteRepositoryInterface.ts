import { Quote } from '../Entity/Quote';

export interface QuoteRepositoryInterface {
  findById(id: number): Promise<Quote | undefined>;
  findOneForPosting(): Promise<Quote | undefined>;
  count(): Promise<number>;
}
