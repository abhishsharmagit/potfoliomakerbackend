import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entitity";

@Entity()
export class PortfolioEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => User, {
    lazy: true,
  })
  @JoinColumn({ name: "userId" })
  user: User;
}
