import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../user.entity';
import { ICreatedFileInterface } from './createdfile.interface';

@Entity()
export class CreatedFileEntity implements ICreatedFileInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fileName: string;

  @Column()
  sha: string;

  @Column()
  repoName: string;

  @Column()
  userId: string;

  @ManyToOne(() => Users, {
    lazy: true,
  })
  @JoinColumn({ name: 'userId' })
  user: Users;
}
