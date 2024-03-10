import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { database } from 'src/database/storage';
import { Album, Artist, Track } from 'src/types';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  getAllFavorites() {
    return database.favorites;
  }

  addFavorite(id: string, entity: string) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. ${entity}Id is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const elementIndex = database[`${entity}s`].findIndex(
      (elem: Artist | Track | Album) => elem.id === id,
    );

    if (elementIndex === -1) {
      throw new HttpException(
        `${entity} was not found.`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    database.favorites[`${entity}s`].push(id);
  }

  deleteFavorite(id: string, entity: string) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. ${entity}Id is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const elementIndex = database.favorites[`${entity}s`].findIndex(
      (elem: string) => elem === id,
    );

    if (elementIndex === -1) {
      throw new HttpException(`${entity} was not found.`, HttpStatus.NOT_FOUND);
    }

    database.favorites[`${entity}s`] = database.favorites[`${entity}s`].filter(
      (elem: string) => elem !== id,
    );
  }
}
