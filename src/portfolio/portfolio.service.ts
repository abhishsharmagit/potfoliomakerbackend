import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from 'src/entities/portfolio.entity';
import { User } from 'src/entities/user.entitity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private portfolioRepo: Repository<PortfolioEntity>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getCreatedPortfolio(id: string) {
    try {
      const user = await this.userRepository.findOne({ id });
      return await this.portfolioRepo.find({ user });
    } catch (err) {
      return {
        message: 'Error when trying to get created Repository',
      };
    }
  }
}
