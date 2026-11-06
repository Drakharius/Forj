import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/create-auth.dto';
import bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: RegisterDto) {
    return await this.usersRepository.save(data);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(data: Partial<User>): Promise<User | null> {
    if (!data) {
      throw new NotFoundException(
        `User with criteria ${JSON.stringify(data)} not found`,
      );
    }

    return await this.usersRepository.findOneBy(data);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updateData = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updateUser = await this.usersRepository.update(id, updateData);

    return updateUser;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.usersRepository.delete(id);

    return { message: `User with ID ${id} has been deleted` };
  }
}
