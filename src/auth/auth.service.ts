import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/createUserDTO';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    readonly configService: ConfigService,
    @InjectRepository(Users) private userRepo: Repository<Users>,
  ) {}

  async getUser(id: any, userName: string, token: string) {
    console.log(token, id, userName);
    const userExist = await this.userRepo.findOne({ githubId: id });
    console.log('here');
    if (userExist) {
      console.log('in');

      const user = await this.userRepo.update({ githubId: id }, { token });
      return await this.userRepo.findOne({ githubId: id });
    } else {
      const payload = {
        userName,
        token,
        githubId: id,
      };
      console.log(13)
      const userEntity = await this.userRepo.create(payload);
      console.log(userEntity, 'userentity')
      console.log(23)
      const user = await this.userRepo.save(userEntity);
      console.log(user);
      return user;
    }
  }
}
