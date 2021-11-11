import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entitity";

@Entity()
export class RepoEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  repoName: string;

  @ManyToOne(() => User, {
    lazy: true,
  })
  @JoinColumn({ name: "userId" })
  user: User;
}
