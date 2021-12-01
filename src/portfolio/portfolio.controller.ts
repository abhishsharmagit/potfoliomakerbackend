import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetPortfolioDTO } from 'src/dto/getPortfolioDTO';
import { PortfolioService } from './portfolio.service';

@Controller()
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}
  @Post('getPortfolioById')
  async getCreatedPortfolio(@Body() dto: GetPortfolioDTO) {
    return await this.portfolioService.getCreatedPortfolio(dto.id);
  }
}
