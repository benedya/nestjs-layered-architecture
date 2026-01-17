import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';

export const dbSourceOptions: DataSourceOptions = {
  type: 'mysql',
  connectorPackage: 'mysql2',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [__dirname + '/../Module/**/Domain/Entity/*.[jt]s'],
  migrations: [__dirname + '/Migration/*.[jt]s'],
  debug: false,
  migrationsRun: true,
};

const getDataSourceOptions = async (): Promise<DataSourceOptions> => {
  const connectionOptions = {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  };

  return {
    ...dbSourceOptions,
    ...connectionOptions,
  };
};

const buildDataSource = async (): Promise<DataSource> => {
  const parameters = await getDataSourceOptions();
  return new DataSource(parameters);
};

export default buildDataSource();

export const typeOrmModuleConfig = TypeOrmModule.forRootAsync({
  useFactory: async () => {
    return await getDataSourceOptions();
  },
});
