import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { FileEntity } from './entities/file.entity';
import { PortfolioEntity } from './entities/portfolio.entity';
import { RepoEntity } from './entities/repo.entity';
import * as path from 'path';
import { dev } from './helper/types';

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
              entities: [User, FileEntity, PortfolioEntity, RepoEntity],
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
              entities: [User, FileEntity, PortfolioEntity, RepoEntity],
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
