import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const storage = {
  storage: diskStorage({
    destination: `${process.cwd()}/dist/images`,
    filename: (req, file, cb) => {
      const filename: string = path
        .parse('portfolioImage')
        .name.replace(/\s/g, '');
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
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

  @UseGuards(JWTAuthGuard)
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Req() req) {
    try {
      console.log(file, 'filename');
      return file.filename;
    } catch (err) {
      console.log(err);
    }
  }
}
