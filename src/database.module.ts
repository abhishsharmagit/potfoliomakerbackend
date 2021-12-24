import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Users } from './entities/user.entity';
import * as path from 'path';
import { dev } from './helper/types';
import { UserPortfolio } from './entities/UserPortfolio';
import { CreatedFileEntity } from './entities/CreatedFile/createdfile.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        dev
          ? {
              type: 'postgres',
              host: configService.get('POSTGRES_HOST'),
              port: configService.get('POSTGRES_PORT'),
              username: configService.get('POSTGRES_USER'),
              password: configService.get('POSTGRES_PASSWORD'),
              database: configService.get('POSTGRES_DB'),
              entities: [Users, UserPortfolio, CreatedFileEntity],
              synchronize: true,
              migrationsTableName: 'typeorm_migrations',
              migrations: [
                path.resolve(`${process.cwd()}/dist/migrations/*.js`),
              ],
              cli: {
                migrationsDir: 'migrations',
              },
            }
          : {
              type: 'postgres',
              host: configService.get('POSTGRES_HOST'),
              port: configService.get('POSTGRES_PORT'),
              username: configService.get('POSTGRES_USER'),
              password: configService.get('POSTGRES_PASSWORD'),
              database: configService.get('POSTGRES_DB'),
              entities: [Users, UserPortfolio, CreatedFileEntity],
              synchronize: true,
              migrationsTableName: 'typeorm_migrations',
              migrations: [
                path.resolve(`${process.cwd()}/dist/migrations/*.js`),
              ],
              cli: {
                migrationsDir: 'migrations',
              },
              ssl: {
                rejectUnauthorized: false,
              },
            },
    }),
  ],
})
export class DatabaseModule {}
