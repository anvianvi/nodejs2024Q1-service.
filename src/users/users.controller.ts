import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateNewUserDto } from 'src/dto/data-transfer-objects';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() dto: CreateNewUserDto) {
    return this.usersService.createNewUser(dto);
  }
}
