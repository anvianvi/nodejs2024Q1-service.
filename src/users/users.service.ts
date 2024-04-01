import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate } from 'uuid';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(
      (user) =>
        new User({
          ...user,
          createdAt: user.createdAt.getTime(),
          updatedAt: user.updatedAt.getTime(),
        }),
    );
  }

  async createNewUser(dto: CreateUserDto) {
    const { login, password } = dto;
    if (!login || !password) {
      throw new HttpException(
        `Bad request. body does not contain required fields`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: dto.password,
      },
    });

    const newUser = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };

    return newUser;
  }

  async findUnique(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. userId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    const response = Object.fromEntries(
      Object.entries(user).filter(([key]) => key !== 'password'),
    );
    return response;
  }

  async updateUserPassword(id: string, dto: UpdateUserDto) {
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

    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    if (dto.oldPassword !== user.password) {
      throw new HttpException(`oldPassword is wrong`, HttpStatus.FORBIDDEN);
    }

    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: dto.newPassword,
        version: user.version + 1,
      },
    });
  }

  async deleteUserById(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. userId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
