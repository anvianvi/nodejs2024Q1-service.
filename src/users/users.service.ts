import { BadRequestException, Injectable } from '@nestjs/common';
import { database } from 'src/database/storage';
import { CreateNewUserDto } from 'src/dto/data-transfer-objects';
import { User } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  getAllUsers() {
    return database.users;
  }

  createNewUser(dto: CreateNewUserDto): Omit<User, 'password'> {
    const { login, password } = dto;

    if (!login || !password) {
      throw new BadRequestException(
        'Request body does not contain required fields.',
      );
    }

    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    database.users.push(newUser);

    const response = { ...newUser };
    delete response.password;
    return response;
  }
}
