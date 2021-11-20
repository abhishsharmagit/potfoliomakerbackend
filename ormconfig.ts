import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entitity';
import * as path from 'path';
import { PortfolioEntity } from 'src/entities/portfolio.entity';
import { FileEntity } from 'src/entities/file.entity';
import { RepoEntity } from 'src/entities/repo.entity';

const configService = new ConfigService();
const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  synchronize: false,
  entities: [User, PortfolioEntity, FileEntity, RepoEntity],
  migrationsTableName: 'typeorm_migrations',
  migrations: [path.resolve(`${process.cwd()}/dist/migrations/*.js`)],
  cli: {
    migrationsDir: 'migrations',
  },
  ssl: {
    rejectUnauthorized: true
  }
};
export default config;
