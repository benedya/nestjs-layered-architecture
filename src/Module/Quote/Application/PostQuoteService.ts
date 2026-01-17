import { Inject, Injectable, Logger } from '@nestjs/common';
import { TYPES } from '@/Common/Contract/TypesAssociation';
import { QuoteRepositoryInterface } from '../Domain/Repository/QuoteRepositoryInterface';
import { QuotePostingRepositoryInterface } from '../Domain/Repository/QuotePostingRepositoryInterface';
import { EntityManagerInterface } from '@/Common/Contract/EntityManagerInterface';
import { QuoteSenderInterface } from './Contract/QuoteSenderInterface';
import { UserProviderInterface } from './Contract/UserProviderInterface';
import { QuotePosting } from '../Domain/Entity/QuotePosting';

@Injectable()
export class PostQuoteService {
  private readonly logger = new Logger(PostQuoteService.name);

  constructor(
    @Inject(TYPES.QuoteRepository)
    private readonly quoteRepository: QuoteRepositoryInterface,
    @Inject(TYPES.QuotePostingRepository)
    private readonly quotePostingRepository: QuotePostingRepositoryInterface,
    @Inject(TYPES.UserProvider)
    private readonly userProvider: UserProviderInterface,
    @Inject(TYPES.EntityManager)
    private readonly entityManager: EntityManagerInterface,
    @Inject(TYPES.QuoteSender)
    private readonly quoteSender: QuoteSenderInterface,
  ) {}

  async execute(): Promise<void> {
    this.logger.log('Starting quote posting process');

    const quote = await this.quoteRepository.findOneForPosting();

    if (!quote) {
      this.logger.debug('No quote available for posting');
      return;
    }

    this.logger.log(
      `Found quote for posting: id=${quote.id}, userId=${quote.userId}`,
    );

    // Get the user data through anticorruption layer
    const user = await this.userProvider.findUserById(quote.userId);

    if (!user) {
      this.logger.error(`User not found for userId=${quote.userId}`);
      return;
    }

    // Send the quote to the user using Telegram
    this.logger.log(`Sending quote to user messengerId=${user.messengerId}`);
    await this.quoteSender.sendQuote(user.messengerId, quote.text);
    this.logger.log('Quote sent successfully');

    // Update or create QuotePosting record
    let quotePosting = await this.quotePostingRepository.findByQuoteId(
      quote.id,
    );

    if (!quotePosting) {
      this.logger.debug(
        `Creating new QuotePosting record for quoteId=${quote.id}`,
      );
      quotePosting = new QuotePosting();
      quotePosting.quoteId = quote.id;
      quotePosting.postCount = 0;
    } else {
      this.logger.debug(
        `Updating existing QuotePosting record for quoteId=${quote.id}, current postCount=${quotePosting.postCount}`,
      );
    }

    quotePosting.postCount += 1;
    quotePosting.lastPostedAt = new Date();

    this.logger.log(`Updating user lastPostedAt for userId=${user.id}`);
    // Update user's lastPostedAt through anticorruption layer
    await this.userProvider.updateUserLastPostedAt(user.id, new Date());

    // Save quotePosting entity
    this.logger.debug(
      `Saving QuotePosting record: quoteId=${quote.id}, postCount=${quotePosting.postCount}`,
    );
    await this.entityManager.transaction(quotePosting);
  }
}
