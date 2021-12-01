import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities/file.entity';
import { PortfolioEntity } from 'src/entities/portfolio.entity';
import { RepoEntity } from 'src/entities/repo.entity';
import { User } from 'src/entities/user.entitity';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity, PortfolioEntity, RepoEntity, User]),
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController],
  exports: [PortfolioService],
})
export class PortfolioModule {}
