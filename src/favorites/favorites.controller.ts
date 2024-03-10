import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllAlbums() {
    return this.favoritesService.getAllFavorites();
  }
}
