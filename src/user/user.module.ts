import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatedFileEntity } from 'src/entities/CreatedFile/createdfile.entity';
import { Users } from 'src/entities/user.entity';
import { UserPortfolio } from 'src/entities/UserPortfolio';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UserPortfolio, CreatedFileEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
