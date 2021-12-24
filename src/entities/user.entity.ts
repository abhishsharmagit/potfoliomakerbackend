import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPortfolio } from './UserPortfolio';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  token: string;

  @Column()
  githubId: string;

  @OneToMany(() => UserPortfolio, (userPortfolio: UserPortfolio) => userPortfolio.id)
  portfolios: UserPortfolio[];

}

export interface IUser {
  id: string | number;
  githubId: string;
  username: string;
}
