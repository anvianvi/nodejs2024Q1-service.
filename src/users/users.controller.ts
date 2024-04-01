import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: string) {
    return this.usersService.findUnique(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createNewUser(@Body() dto: CreateUserDto) {
    return this.usersService.createNewUser(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUserPassword(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUserPassword(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
