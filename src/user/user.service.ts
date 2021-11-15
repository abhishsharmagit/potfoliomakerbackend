import { Injectable, Req } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";
import { CreateFileDTO } from "../dto/createFileDTO";
import { CreateRepoDTO } from "../dto/createRepoDTO";
import { AuthService } from "../auth/auth.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entitity";
import { CreateUserDTO } from "../dto/createUserDTO";
import { request } from "express";
import * as fs from "fs";
import { filePayload } from "src/helper/config";
import { DeployPortfolioDTO } from "src/dto/deployPortfolioDTO";
import { FileEntity } from "src/entities/file.entity";
import { PortfolioEntity } from "src/entities/portfolio.entity";
import { RepoEntity } from "src/entities/repo.entity";
import { IcreatePortfolioDTO } from "src/dto/createPortfolioDTO";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @InjectRepository(PortfolioEntity)
    private portfolioRepo: Repository<PortfolioEntity>,
    @InjectRepository(RepoEntity)
    private repoRepository: Repository<RepoEntity>
  ) {}

  async getUser(id: string) {
    try {
      const user: User = await this.userRepository.findOne({
        id,
      });
      return user;
    } catch (e) {
      console.log(e.message);
    }
  }

  async createRepo(dto: CreateRepoDTO, id: string) {
    try {
      const user = await this.userRepository.findOne(id);

      const config: AxiosRequestConfig = {
        method: "POST",
        data: dto,
        headers: {
          Authorization: `Bearer ${await this.getToken(id)}`,
          "Content-Type": "application/json",
        },
      };
      const repo: any = await axios(
        "https://api.github.com/user/repos",
        config
      );
      console.log(repo,'repo')
      const payload = {
        repoName: dto.name,
        user: user,
      };
      const repoEntity = await this.repoRepository.create(payload);
      await this.repoRepository.save(repoEntity);
      return repo.data;
    } catch (e) {
      console.log(e);
    }
  }

  async createFile(id: string, dto: CreateFileDTO, repoName: string) {
    try {
      const user = await this.userRepository.findOne(id);
      const fileExist = await this.fileRepository.findOne({
        fileName: dto.fileName,
        repoName: repoName,
      });
      console.log(fileExist.sha, 'sha')
      const params = {
        owner: user.username,
        repo: repoName,
        path: dto.path,
      };
      const content = fs.readFileSync(
        `/home/thinksys/Desktop/oauthGithub/nestdeploy/dist/${params.path}`,
        "binary"
      );

      const data = fileExist
        ? {
            message: dto.message,
            content: Buffer.from(content, "binary").toString("base64"),
            sha: fileExist.sha,
          }
        : {
            message: dto.message,
            content: Buffer.from(content, "binary").toString("base64"),
          };

      const config: AxiosRequestConfig = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await this.getToken(id)}`,
        },
        data: data,
      };
      const createdfile: any = await axios(
        `https://api.github.com/repos/${params.owner}/${params.repo}/contents/${params.path}`,
        config
      );
      const payload = {
        fileName: createdfile.data.content.name,
        sha: createdfile.data.content.sha,
        repoName: repoName,
        user: user,
      };
      if (!fileExist) {
        const fileEntity = await this.fileRepository.create(payload);
        await this.fileRepository.save(fileEntity);
      }

      return createdfile.data;
    } catch (e) {
      console.log(e);
    }
  }

  async getToken(id: string) {
    const user = await this.userRepository.findOne({ id });
    console.log(user.token,'usertoken')
    return user.token;
  }

  async createPortfolio(dto:IcreatePortfolioDTO, id: string) {
    console.log(__dirname,'dirname')
    const js = fs.writeFileSync(
      "/home/thinksys/Desktop/oauthGithub/nestdeploy/dist/js/credentials.json",
      JSON.stringify(dto)
    );

    const repoPayload: CreateRepoDTO = {
      name: dto.portfolio,
      description: "my portfolio",
      homepage: "https://github.com",
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true,
    };
    const existingRepo = await this.repoRepository.findOne({
      repoName: repoPayload.name,
    });
console.log(1)
    !existingRepo && (await this.createRepo(repoPayload, id));

    const files = filePayload;
    for (const file of files) {
      await this.createFile(id, file, dto.portfolio);
    }
    const githubPage = await this.getGithubPage(repoPayload.name, id);

    if (githubPage) {
      return githubPage;
    } else {
      return await this.deployPortfolio(id, dto.portfolio);
    }
  }

  async deployPortfolio(id: string, repoName: string) {
    const user = await this.userRepository.findOne(id);

    const params: DeployPortfolioDTO = {
      owner: user.username,
      repo: repoName,
    };
    const data = {
      source: {
        branch: "main",
        path: "/",
      },
    };

    const config: AxiosRequestConfig = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await this.getToken(id)}`,
      },
      data: data,
    };
    const result: any = await axios(
      `https://api.github.com/repos/${params.owner}/${params.repo}/pages`,
      config
    );
    const payload = {
      url: result.data.html_url,
      user: user,
    };
    const portfolioEntity = await this.portfolioRepo.create(payload);
    this.portfolioRepo.save(portfolioEntity);
    return result.data.html_url;
  }

  async getGithubPage(repo: string, id: string) {
    try {
      const user = await this.userRepository.findOne(id);
      const config: AxiosRequestConfig = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await this.getToken(id)}`,
        },
      };

      const page: any = await axios(
        `https://api.github.com/repos/${user.username}/${repo}/pages`,
        config
      );
      return page.data.html_url;
    } catch (e) {
      console.log(e);
    }
  }
}
