import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Auth } from '../../auth/entities/auth.entity';
import { Workout } from '../../workouts/entities/workout.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', default: 'user', enum: ['user', 'admin'] })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // RELATIONSHIPS

  @OneToMany(() => Auth, (auth) => auth.user)
  authSessions: Auth[];

  @OneToMany(() => Workout, (workout) => workout.user, { onDelete: 'CASCADE' })
  workouts: Workout[];
}
