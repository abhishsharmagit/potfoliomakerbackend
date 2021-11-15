import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { CreateUserDTO } from "src/dto/createUserDTO";
import { User } from "src/entities/user.entitity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    readonly configService: ConfigService,
    private userService: UserService,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async getUser(id: any, username: string, token: string) {
    const userExist = await this.userRepo.findOne({ githubId: id });
    if (userExist) {
      const user = await this.userRepo.update({ githubId: id }, { token });
      return await this.userRepo.findOne({ githubId: id });
    } else {
      const payload: CreateUserDTO = {
        username,
        token,
        githubId: id,
      };
      const userEntity = await this.userRepo.create(payload);
      const user = await this.userRepo.save(userEntity);
      return user;
    }
  }
}
