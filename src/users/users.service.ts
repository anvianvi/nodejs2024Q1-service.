import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { database } from 'src/database/storage';
import { CreateNewUserDto } from 'src/dto/data-transfer-objects';
import { User } from 'src/types';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class UsersService {
  getAllUsers() {
    return database.users;
  }

  createNewUser(dto: CreateNewUserDto): Omit<User, 'password'> {
    const { login, password } = dto;
    if (!login || !password) {
      throw new HttpException(
        'Request body does not contain required fields.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: User = {
      id: uuidv4(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    database.users.push(newUser);

    const response = Object.keys(newUser).reduce((obj, key) => {
      if (key !== 'password') {
        obj[key] = newUser[key];
      }
      return obj;
    }, {});

    return response as Omit<User, 'password'>;
  }

  getUserById(id: string): Omit<User, 'password'> {
    if (!validate(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }

    const user = database.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException(`User ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }

    const response = Object.keys(user).reduce((obj, key) => {
      if (key !== 'password') {
        obj[key] = user[key];
      }
      return obj;
    }, {});

    return response as Omit<User, 'password'>;
  }
}
