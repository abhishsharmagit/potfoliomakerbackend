import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file.entity";
import { PortfolioEntity } from "src/entities/portfolio.entity";
import { RepoEntity } from "src/entities/repo.entity";
import { User } from "src/entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, FileEntity, PortfolioEntity, RepoEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
