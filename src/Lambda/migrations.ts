import { Callback, Context, Handler } from 'aws-lambda';
import buildDataSource from '../Database/TypeORMConfig';

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log('Get DataSource...');
  const dataSource = await buildDataSource;

  console.log('Initialize connection...');
  await dataSource.initialize();

  console.log('Run migrations...');
  const result = await dataSource.runMigrations({});
  const migrationNames = result.map((item) => item.name);

  console.info('Migrations: ', migrationNames);

  console.log('Close connection...');
  await dataSource.destroy();

  console.log('Success');
  callback(null, {
    migrations: migrationNames,
  });
};
