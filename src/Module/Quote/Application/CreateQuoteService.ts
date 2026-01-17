import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '@/Common/Contract/TypesAssociation';
import { EntityManagerInterface } from '@/Common/Contract/EntityManagerInterface';
import { Quote } from '../Domain/Entity/Quote';
import { CreateQuoteDTO } from './Type/CreateQuoteDTO';

@Injectable()
export class CreateQuoteService {
  constructor(
    @Inject(TYPES.EntityManager)
    private readonly entityManager: EntityManagerInterface,
  ) {}

  async execute(createQuoteDTO: CreateQuoteDTO): Promise<void> {
    const quote = new Quote();
    quote.text = createQuoteDTO.text;
    quote.userId = createQuoteDTO.userId;
    quote.createdAt = new Date();

    await this.entityManager.transaction(quote);
  }
}
