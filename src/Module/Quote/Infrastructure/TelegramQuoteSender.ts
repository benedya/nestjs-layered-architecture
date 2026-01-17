import { Injectable, Logger } from "@nestjs/common";
import { QuoteSenderInterface } from "../Application/Contract/QuoteSenderInterface";

@Injectable()
export class TelegramQuoteSender implements QuoteSenderInterface {
  private readonly logger = new Logger(TelegramQuoteSender.name);

  async sendQuote(messengerId: string, quoteText: string): Promise<void> {
    this.logger.log(`Quote sent to messenger ID ${messengerId}: ${quoteText}`);
  }
}
