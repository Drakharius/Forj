import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async register(data: RegisterDto) {
    const user = await this.usersService.findOne({ email: data.email });

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(data: LoginDto) {
    const user = await this.usersService.findOne({ username: data.username });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const comparePassword = await bcrypt.compare(data.password, user.password);

    if (!comparePassword || data.username !== user.username) {
      throw new UnauthorizedException('password or username not valide');
    }

    const payload = { sub: user.id, username: user.username };

    const sessions = await this.authRepository.create({
      userId: user.id,
      refreshToken: this.jwtService.sign(payload),
    });

    return { access_token: this.jwtService.sign(payload) };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
