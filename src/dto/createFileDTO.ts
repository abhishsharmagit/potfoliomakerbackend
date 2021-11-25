import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface IcreateFileDTO {
  path: string;
  repoName?: string;
  readPath: string;
}

export class CreateFileDTO implements IcreateFileDTO {
  @IsString()
  path: string;
  @IsString()
  readPath: string;
  @IsString()
  message: string;
  @IsString()
  repoName?: string;
  @IsString()
  fileName: string;
}
