import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Workout } from './workout.entity';

@Entity('workout_exercises')
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workoutId: number;

  @Column()
  exerciseName: string;

  @Column()
  order: number;

  @ManyToOne((type) => Workout, (workout) => workout.exercises, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workoutId' }) // This decorator specifies the foreign key column name in the Auth entity
  workout: Workout;
}
