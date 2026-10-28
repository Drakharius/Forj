import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from 'node_modules/@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      global: true, // 👈 Questo rende il JWT utilizzabile ovunque senza doverlo riesportare (opzionale ma comodo)
      secret: process.env.JWT_SECRET, // (Da mettere poi nelle variabili d'ambiente .env)
      signOptions: { expiresIn: '1d' }, // Scade dopo 1 giorno
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
