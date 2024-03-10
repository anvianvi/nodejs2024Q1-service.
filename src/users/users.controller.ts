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
import {
  CreateNewUserDto,
  UpdateUserPasswordDto,
} from 'src/dto/data-transfer-objects';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createNewUser(@Body() dto: CreateNewUserDto) {
    return this.usersService.createNewUser(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUserPassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updateUserPassword(id, updateUserPasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
