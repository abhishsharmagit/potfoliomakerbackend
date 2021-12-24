import { IsEmail, IsNumber, IsString } from 'class-validator';

export interface IcreatePortfolioDTO {
  about: string;
  address: string;
  description: string;
  phone?: number | undefined;
  firstName: string;
  portfolioName: string;
  profile: string;
  inTouch: string;
  email: string;
  template: string;
  imageName?: string;
  resumeName?: string;
}

export class CreatePortfolioDTO implements IcreatePortfolioDTO {
  @IsString()
  about: string;
  @IsString()
  address: string;
  @IsString()
  description: string;
  @IsString()
  firstName: string;
  @IsNumber()
  phone?: number;
  @IsString()
  portfolioName: string;
  @IsString()
  inTouch: string;
  @IsEmail()
  email: string;
  @IsString()
  template: string;
  @IsString()
  profile: string;
}
