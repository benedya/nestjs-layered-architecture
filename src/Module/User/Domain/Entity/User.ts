import { randomUUID } from 'crypto';

export class User {
  readonly uuid: string;
  readonly name: string;
  constructor(name: string) {
    this.name = name;

    this.uuid = randomUUID();
  }
}
