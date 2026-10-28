import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkoutExercise } from './workout_exercises.entity';

@Entity('workout_sets')
export class WorkoutSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  setNumber: number;

  @Column()
  reps: number;

  @Column()
  weight: number;

  @Column()
  workout_exercise_id: number;

  @ManyToOne(
    (type) => WorkoutExercise,
    (workoutExercise) => workoutExercise.workoutSets,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'workout_exercise_id' }) // This decorator specifies the foreign key column name in the Auth entity
  workoutExercise: WorkoutExercise;
}
