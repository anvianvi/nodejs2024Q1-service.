import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { database } from 'src/database/storage';
import {
  CreateNewUserDto,
  UpdateUserPasswordDto,
} from 'src/dto/data-transfer-objects';
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
        `Bad request. body does not contain required fields`,
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

    const response = Object.fromEntries(
      Object.entries(newUser).filter(([key]) => key !== 'password'),
    );
    return response as Omit<User, 'password'>;
  }

  getUserById(id: string): Omit<User, 'password'> {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. userId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = database.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    const response = Object.fromEntries(
      Object.entries(user).filter(([key]) => key !== 'password'),
    );
    return response as Omit<User, 'password'>;
  }

  updateUserPassword(id: string, dto: UpdateUserPasswordDto) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. userId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      !(dto.oldPassword && dto.newPassword) ||
      typeof dto.oldPassword !== 'string' ||
      typeof dto.newPassword !== 'string'
    ) {
      throw new HttpException(`invalid dto`, HttpStatus.BAD_REQUEST);
    }

    const user = database.users.find((user) => user.id === id);
    const userIndex = database.users.findIndex((user) => user.id === id);

    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    if (dto.oldPassword !== user.password) {
      throw new HttpException(`oldPassword is wrong`, HttpStatus.FORBIDDEN);
    }

    const updatedUser = {
      id: user.id,
      login: user.login,
      password: dto.newPassword,
      version: user.version + 1,
      createdAt: user.createdAt,
      updatedAt: Date.now(),
    };

    database.users[userIndex] = updatedUser;

    const response = Object.fromEntries(
      Object.entries(updatedUser).filter(([key]) => key !== 'password'),
    );
    return response as Omit<User, 'password'>;
  }

  deleteUserById(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. userId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const userIndex = database.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    database.users.splice(userIndex, 1);
  }
}
