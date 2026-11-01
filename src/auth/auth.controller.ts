import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() RegisterDto: RegisterDto) {
    return await this.authService.register(RegisterDto);
  }

  @Public()
  @Post('login')
  async login(@Body() RegisterDto: RegisterDto) {
    return await this.authService.login(RegisterDto);
  }
}
