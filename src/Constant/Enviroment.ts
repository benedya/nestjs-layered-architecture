import * as process from 'process';

export class Enviroment {
  static NODE_ENV = process.env.NODE_ENV; // development | production
  static DATABASE_NAME = process.env.DATABASE_NAME;
  static DATABASE_USERNAME = process.env.DATABASE_USERNAME;
  static DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  static DATABASE_HOST = process.env.DATABASE_HOST;
}
