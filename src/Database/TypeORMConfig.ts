import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { SecretsManager } from '@aws-sdk/client-secrets-manager';
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
  entities: [__dirname + '/Schema/*.[jt]s'],
  migrations: [__dirname + '/Migration/*.[jt]s'],
  debug: false,
};

const assertString = (data: Record<string, string>, key: string) => {
  if (!data[key]) {
    throw new Error(`${key} is empty.`);
  }
};

interface SecretsManagerParameters {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
let secretsManagerParameters: SecretsManagerParameters | undefined = undefined;
const getDatabaseParametersFromSecretsManager = async (): Promise<
  SecretsManagerParameters | undefined
> => {
  if (secretsManagerParameters) {
    console.info('Got secret data from the cache.');

    return secretsManagerParameters;
  }

  const SecretId = process.env.DATABASE_CREDENTIALS_SECRET_ARN;

  console.info(`SecretId: ${SecretId}`);

  if (SecretId) {
    const secretsManager = new SecretsManager();
    const { SecretString } = await secretsManager.getSecretValue({ SecretId });
    const secretData = JSON.parse(SecretString as string);
    assertString(secretData, 'DATABASE_HOST');
    assertString(secretData, 'DATABASE_PORT');
    assertString(secretData, 'DATABASE_USERNAME');
    assertString(secretData, 'DATABASE_PASSWORD');
    assertString(secretData, 'DATABASE_NAME');

    console.info('Save data from the SecretsManager to cache.');

    secretsManagerParameters = {
      host: secretData.DATABASE_HOST,
      port: secretData.DATABASE_PORT,
      username: secretData.DATABASE_USERNAME,
      password: secretData.DATABASE_PASSWORD,
      database: secretData.DATABASE_NAME,
    };
  }

  return secretsManagerParameters;
};

const getDataSourceOptions = async (): Promise<DataSourceOptions> => {
  let connectionOptions = {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  };

  const parameters = await getDatabaseParametersFromSecretsManager();

  if (parameters) {
    connectionOptions = {
      ...connectionOptions,
      ...parameters,
    };
  }

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
