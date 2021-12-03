import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { IPortfolio, PortfolioEntity } from 'src/entities/portfolio.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private portfolioRepo: Repository<PortfolioEntity>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getCreatedPortfolio(id: string): Promise<IPortfolio[]> {
    try {
      const user = await this.userRepository.findOne({ id });
      return await this.portfolioRepo.find({ user });
    } catch (err) {
      throw new NotFoundException('Portfolio Not found');
    }
  }
}
