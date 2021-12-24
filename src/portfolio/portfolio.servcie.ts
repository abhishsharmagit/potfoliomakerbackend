import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { IUserPortfolio, UserPortfolio } from 'src/entities/UserPortfolio';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(UserPortfolio)
    private portfolioRepo: Repository<UserPortfolio>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async getCreatedPortfolio(id: string): Promise<IUserPortfolio[]> {
    try {
     // const user = await this.userRepository.findOne({ id });
      return await this.portfolioRepo.find({ userId: id });
    } catch (err) {
      throw new NotFoundException('Portfolio Not found');
    }
  }
}
