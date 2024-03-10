import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { database } from 'src/database/storage';
import {
  CreateNewAlbumDto,
  UpdateAlbumDto,
} from 'src/dto/data-transfer-objects';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class AlbumsService {
  getAllAlbums() {
    return database.albums;
  }

  getAlbumById(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. albumId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = database.albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException(`Album was not found`, HttpStatus.NOT_FOUND);
    }

    return album;
  }

  createNewAlbum(dto: CreateNewAlbumDto) {
    if (!dto.name || typeof dto.name !== 'string') {
      throw new HttpException(
        `Bad request. body does not contain required fields`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newAlbum = {
      id: uuidv4(),
      name: dto.name,
      year: dto?.year,
      artistId: dto?.artistId,
    };

    database.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbumInfo(id: string, dto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. albumId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = database.albums.find((album) => album.id === id);
    const albumIndex = database.albums.findIndex((album) => album.id === id);

    if (!album) {
      throw new HttpException(`Album was not found`, HttpStatus.NOT_FOUND);
    }

    if (!dto.name || typeof dto.name !== 'string') {
      throw new HttpException(
        `Bad request. body does not contain required fields`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedAlbum = {
      id: id,
      name: dto.name,
      year: dto?.year,
      artistId: dto?.artistId,
    };

    database.albums[albumIndex] = updatedAlbum;

    return database.albums[albumIndex];
  }

  deleteAlbumById(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. albumId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const albumIndex = database.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new HttpException(`Track was not found.`, HttpStatus.NOT_FOUND);
    }

    database.albums.splice(albumIndex, 1);
  }
}
