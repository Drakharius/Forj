import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { WorkoutSet } from './entities/workout_sets.entity';
import { WorkoutExercise } from './entities/workout_exercises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, WorkoutExercise, WorkoutSet])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}
