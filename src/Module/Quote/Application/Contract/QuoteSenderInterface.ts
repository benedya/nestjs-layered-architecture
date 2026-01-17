export interface QuoteSenderInterface {
  sendQuote(messengerId: string, quoteText: string): Promise<void>;
}
