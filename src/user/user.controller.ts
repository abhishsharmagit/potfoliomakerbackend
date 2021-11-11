import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateRepoDTO } from '../dto/createRepoDTO';
import { CreateFileDTO } from '../dto/createFileDTO';
import { JWTAuthGuard } from 'src/auth/guard/jwtGuard';
import { Request } from 'express';
import { User } from 'src/entities/user.entitity';
import {
  CreatePortfolioDTO,
  IcreatePortfolioDTO,
} from 'src/dto/createPortfolioDTO';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  hello() {
    return 'hello';
  }

  @UseGuards(JWTAuthGuard)
  @Get('me')
  async getMe(@Req() req): Promise<User> {
    return await this.userService.getUser(req.user.id);
  }

  @UseGuards(JWTAuthGuard)
  @Post('/create')
  async createPortfolio(@Body() dto: IcreatePortfolioDTO, @Req() req) {
    return await this.userService.createPortfolio(dto, req.user.id);
  }
}
