import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { WorkoutExercise } from './workout_exercises.entity';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  timeStart: Date;

  @Column()
  timeEnd: Date;

  @CreateDateColumn()
  createdAt: Date; // Automatically set when the entity is first created

  @ManyToOne((type) => User, (user) => user.workouts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // This decorator specifies the foreign key column name in the Auth entity
  user: User;

  @OneToMany(
    (type) => WorkoutExercise,
    (workoutExercise) => workoutExercise.workout,
    {
      onDelete: 'CASCADE',
    },
  )
  exercises: WorkoutExercise[];
}
