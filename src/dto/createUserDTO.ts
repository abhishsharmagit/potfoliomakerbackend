import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export interface IcreateUserDTO {
  userName: string;
  githubId:string;
  token:string;
}

export class CreateUserDTO implements IcreateUserDTO {
  @IsString()
  userName: string;
  @IsString()
  githubId: string;
  @IsString()
  token: string;
}
