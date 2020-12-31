import { createConnection } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
export const connect = async () => {
  const connection = await createConnection({
    type: 'postgres',
    database: process.env.TYPEORM_DATABASE,
    host: process.env.HOST,
    port: +process.env.POST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    synchronize: false,
    logging: true,
    migrationsTableName: 'custom_migrate',
    entities: [
      __dirname + '/models/*{.ts,.js}',
    ],
    migrations: [
      __dirname + '/migrations/*.js',
    ],
    cli: {
      entitiesDir: __dirname + '/models/',
      migrationsDir: __dirname + '/migrations/',
    },
    namingStrategy: new SnakeNamingStrategy(),
  });
};
