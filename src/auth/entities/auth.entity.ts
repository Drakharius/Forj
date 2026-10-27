import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('auth_sessions')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ unique: true })
  refreshToken: string;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.authSessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' }) // This decorator specifies the foreign key column name in the Auth entity
  user: User;
}
