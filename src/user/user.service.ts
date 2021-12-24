import { Injectable, Req } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { CreateFileDTO } from '../dto/createFileDTO';
import { CreateRepoDTO } from '../dto/createRepoDTO';
import { AuthService } from '../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser, Users } from '../entities/user.entity';
import * as fs from 'fs';
import { filePayload } from 'src/helper/config';
import { DeployPortfolioDTO } from 'src/dto/deployPortfolioDTO';
import { IcreatePortfolioDTO } from 'src/dto/createPortfolioDTO';
import {
  IFileSHA,
  IUserPortfolio,
  UserPortfolio,
} from 'src/entities/UserPortfolio';
import { CreatedFileEntity } from 'src/entities/CreatedFile/createdfile.entity';
import { ICreatedFileInterface } from 'src/entities/CreatedFile/createdfile.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(UserPortfolio)
    private portfolioRepo: Repository<UserPortfolio>,
    @InjectRepository(CreatedFileEntity)
    private CreatedFileRepo: Repository<CreatedFileEntity>,
  ) {}

  async getUser(id: string): Promise<IUser> {
    try {
      const user: Users = await this.userRepository.findOne({
        id,
      });
      return {
        id: user.id,
        githubId: user.githubId,
        username: user.userName,
      };
    } catch (e) {
      console.log(e.message);
    }
  }

  async createRepo(
    dto: CreateRepoDTO,
    id: string,
    portfolioDTO: IcreatePortfolioDTO,
  ) {
    try {
      const user = await this.userRepository.findOne(id);

      const config: AxiosRequestConfig = {
        method: 'POST',
        data: dto,
        headers: {
          Authorization: `Bearer ${await this.getToken(id)}`,
          'Content-Type': 'application/json',
        },
      };
      const repo: any = await axios(
        'https://api.github.com/user/repos',
        config,
      );

      const payload: IUserPortfolio = {
        userId: id,
        firstName: portfolioDTO.firstName,
        about: portfolioDTO.about,
        address: portfolioDTO.address,
        portfolioName: portfolioDTO.portfolioName,
        profile: portfolioDTO.profile,
        inTouch: portfolioDTO.inTouch,
        description: portfolioDTO.description,
        template: portfolioDTO.template,
        email: portfolioDTO.email,
        phone: portfolioDTO.phone,
      };
      const userEntity = await this.portfolioRepo.create(payload);
      console.log(userEntity, 'userentity')
      const result = await this.portfolioRepo.save(userEntity);
      console.log(result, 'result')
      return repo.data;
    } catch (e) {
      console.log(e.message, 'repoerror');
    }
  }

  async checkRepoExist(userName: string, repoName: string): Promise<boolean> {
    try {
      const existingRepo = await this.portfolioRepo.findOne({
        portfolioName: repoName,
      });

      const repo = await axios(
        `https://api.github.com/users/${userName}/repos`,
      );
      console.log(existingRepo, 'existingrepo');

      const exist = repo.data.filter((data: any) => {
        return data.name === repoName;
      });
      console.log(exist, 'exist');
      if (existingRepo && exist.length > 0) {
        return true;
      } else if (existingRepo && !exist) {
        await this.portfolioRepo.delete({ portfolioName: repoName });
        return false;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e, 'checkrepoeror');
    }
  }

  async createFile(id: string, dto: CreateFileDTO, repoName: string) {
    try {
      const user = await this.userRepository.findOne(id);
      const fileExist = await this.CreatedFileRepo.findOne({
        fileName: dto.fileName,
        repoName: repoName,
        userId: id,
      });

      const params = {
        owner: user.userName,
        repo: repoName,
        path: dto.path,
      };

      const content = fs.readFileSync(
        `${process.cwd()}/dist/${dto.readPath}`,
        'binary',
      );

      const data = fileExist
        ? {
            message: dto.message,
            content: Buffer.from(content, 'binary').toString('base64'),
            sha: fileExist.sha,
          }
        : {
            message: dto.message,
            content: Buffer.from(content, 'binary').toString('base64'),
          };

      const config: AxiosRequestConfig = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${await this.getToken(id)}`,
        },
        data: data,
      };

      const createdfile: any = await axios(
        `https://api.github.com/repos/${params.owner}/${params.repo}/contents/${params.path}`,
        config,
      );
      console.log(2);

      const payload: ICreatedFileInterface = {
        fileName: createdfile.data.content.name,
        sha: createdfile.data.content.sha,
        repoName: repoName,
        userId: id,
      };
      if (!fileExist) {
        const fileEntity = await this.CreatedFileRepo.create(payload);
        await this.CreatedFileRepo.save(fileEntity);
      } else {
        await this.CreatedFileRepo.update({ id }, payload);
      }

      return createdfile.data;
    } catch (e) {
      console.log(e, 'fileerror');
    }
  }

  async getToken(id: string) {
    try {
      const user = await this.userRepository.findOne({ id });
      return user.token;
    } catch (e) {
      console.log(e.message, 'tokenerror');
    }
  }

  async createPortfolio(dto: IcreatePortfolioDTO, id: string) {
    try {
      const js = fs.writeFileSync(
        `${process.cwd()}/dist/${dto.template}/js/credentials.json`,
        JSON.stringify(dto),
      );
      const user = await this.userRepository.findOne(id);

      const repoPayload: CreateRepoDTO = {
        name: dto.portfolioName,
        description: 'my portfolio',
        homepage: 'https://github.com',
        private: false,
        has_issues: true,
        has_projects: true,
        has_wiki: true,
      };

      const checkRepoExist = await this.checkRepoExist(
        user.userName,
        repoPayload.name,
      );

      if (!checkRepoExist) {
        await this.createRepo(repoPayload, id, dto);
      }

      const files = filePayload(dto.template, dto.imageName, dto.resumeName);

      for (const file of files) {
        await this.createFile(id, file, repoPayload.name);
      }

      const githubPage = await this.getGithubPage(repoPayload.name, id);

      if (githubPage) {
        return githubPage;
      } else {
        return await this.deployPortfolio(id, repoPayload.name, dto.template);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async deployPortfolio(id: string, repoName: string, template: string) {
    const user = await this.userRepository.findOne(id);

    const params: DeployPortfolioDTO = {
      owner: user.userName,
      repo: repoName,
    };
    const data = {
      source: {
        branch: 'main',
        path: '/',
      },
    };

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await this.getToken(id)}`,
      },
      data: data,
    };
    const result: any = await axios(
      `https://api.github.com/repos/${params.owner}/${params.repo}/pages`,
      config,
    );

    await this.portfolioRepo.update({ id }, { url: result.data.html_url });

    return `${result.data.html_url}`;
  }

  async getGithubPage(repo: string, id: string) {
    try {
      const user = await this.userRepository.findOne(id);
      const config: AxiosRequestConfig = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${await this.getToken(id)}`,
        },
      };

      const page: any = await axios(
        `https://api.github.com/repos/${user.userName}/${repo}/pages`,
        config,
      );
      return page.data.html_url;
    } catch (e) {
      console.log(e.message);
    }
  }
}
