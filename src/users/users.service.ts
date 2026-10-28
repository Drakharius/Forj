import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from 'node_modules/@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(data);
  }

  async findAll() {
    return await this.findAll();
  }

  async findOne(data: Partial<User>): Promise<User | null> {
    return await this.usersRepository.findOneBy(data);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.remove(id);
  }
}
