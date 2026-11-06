import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { RegisterDto } from 'src/auth/dto/create-auth.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {}
