import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entitity';
import { FileEntity } from './entities/file.entity';
import { PortfolioEntity } from './entities/portfolio.entity';
import { RepoEntity } from './entities/repo.entity';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [User, FileEntity, PortfolioEntity, RepoEntity],
        synchronize: false,
        migrationsTableName: 'typeorm_migrations',
        migrations: [path.resolve(`${process.cwd()}/dist/migrations/*.js`)],
        cli: {
          migrationsDir: 'migrations',
        },
        ssl: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
