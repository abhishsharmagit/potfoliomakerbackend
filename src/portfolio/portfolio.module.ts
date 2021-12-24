import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { UserPortfolio } from 'src/entities/UserPortfolio';
import { UserModule } from 'src/user/user.module';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.servcie';

@Module({
  imports: [TypeOrmModule.forFeature([UserPortfolio, Users]), UserModule],
  providers: [PortfolioService],
  controllers: [PortfolioController],
  exports: [PortfolioService],
})
export class PortfolioModule {}
