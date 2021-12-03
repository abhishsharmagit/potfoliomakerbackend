import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities/file.entity';
import { PortfolioEntity } from 'src/entities/portfolio.entity';
import { RepoEntity } from 'src/entities/repo.entity';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.servcie';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity, PortfolioEntity, RepoEntity, User]),
    UserModule,
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController],
  exports: [PortfolioService],
})
export class PortfolioModule {}
