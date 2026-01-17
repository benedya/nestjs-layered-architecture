import { Controller, Get } from '@nestjs/common';
import { ExampleType } from './Type/ExampleType';
import { GetUserService } from '@/Module/User/Application/GetUserService';
import { randomUUID } from 'crypto';
import { CreateQuoteService } from '@/Module/Quote/Application/CreateQuoteService';
import { PostQuoteService } from '@/Module/Quote/Application/PostQuoteService';
import { GetQuoteListService } from '@/Module/Quote/Application/GetQuoteListService';
import { GetUserListService } from '@/Module/User/Application/GetUserListService';

/**
 * Example Controller - For Demo Purposes Only
 *
 * This controller demonstrates the layered architecture pattern and
 * how different modules interact through the application layer.
 * In a real application, you would have separate controllers for each resource.
 */
@Controller('/')
export class ExampleController {
  constructor(
    private readonly userProviderService: GetUserService,
    private readonly createQuoteService: CreateQuoteService,
    private readonly postQuoteService: PostQuoteService,
    private readonly getQuoteListService: GetQuoteListService,
    private readonly getUserListService: GetUserListService,
  ) {}

  @Get('')
  async get(): Promise<ExampleType> {
    const names = [
      'Alice',
      'Bob',
      'Charlie',
      'Diana',
      'Eve',
      'Frank',
      'Grace',
      'Henry',
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];

    // Create a user
    const user = await this.userProviderService.getUser({
      messengerId: randomUUID(),
      name: randomName,
    });

    // Create a quote for the user
    await this.createQuoteService.execute({
      text: `This is a sample quote for user ${user.name}.`,
      userId: user.id,
    });

    // Post quotes (send to users)
    await this.postQuoteService.execute();

    return {
      countQuotes: await this.getQuoteListService.getTotalQuotes(),
      countUsers: await this.getUserListService.getTotalUsers(),
    };
  }
}
