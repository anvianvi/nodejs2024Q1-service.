import { Injectable } from '@nestjs/common';
import { database } from 'src/database/storage';

@Injectable()
export class FavoritesService {
  getAllFavorites() {
    return database.favorites;
  }
}
