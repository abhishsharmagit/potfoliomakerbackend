import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../user.entity';
import { IUserPortfolio } from './userportfolio.interface';

@Entity()
export class UserPortfolio implements IUserPortfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false, unique: true })
  portfolioName: string;

  @Column()
  profile: string;

  @Column()
  description: string;

  @Column()
  about: string;

  @Column({ nullable: true })
  phone: number;

  @Column()
  inTouch: string;

  @Column()
  email: string;

  @Column({ nullable: false })
  template: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  url: string;

  @ManyToOne(() => Users, {
    lazy: true,
  })
  @JoinColumn({ name: 'userId' })
  user: Users;
}
