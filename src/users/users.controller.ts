import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // USER SECTION

  @Get('me')
  async getProfile(@Req() req: any) {
    console.log('Request object:', req.user);
    const userId = req.user.sub;
    console.log('User ID from request:', userId);
    return await this.usersService.findOne({ id: userId });
  }

  @Patch('me')
  async updateProfile(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.sub;
    return await this.usersService.update(userId, updateUserDto);
  }

  @Delete('me')
  async remove(@Req() req: any) {
    const userId = req.user.sub;
    return await this.usersService.remove(userId);
  }

  // ADMIN ONLY

  @Get('all')
  @Roles(['admin'])
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @Roles(['admin'])
  async findOneAdmin(@Param('id') id: number) {
    return await this.usersService.findOne({ id });
  }

  @Patch(':id')
  @Roles(['admin'])
  async updateAdmin(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  async removeAdmin(@Param('id') id: number) {
    return await this.usersService.remove(id);
  }
}
