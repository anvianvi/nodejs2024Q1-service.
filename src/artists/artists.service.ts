import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { database } from 'src/database/storage';
import {
  CreateNewArtistDto,
  UpdateArtistDto,
} from 'src/dto/data-transfer-objects';
import { Artist } from 'src/types';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class ArtistsService {
  getAllArtists() {
    return database.artists;
  }

  getArtistyId(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. artistId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = database.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException(`Artist was not found`, HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  createNewArtist(dto: CreateNewArtistDto) {
    if (!dto.name || typeof dto.name !== 'string') {
      throw new HttpException(
        `Bad request. body does not contain required fields`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newArtist: Artist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto?.grammy,
    };

    database.artists.push(newArtist);

    return newArtist;
  }

  updateArtistInfo(id: string, dto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. artistId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = database.artists.find((artist) => artist.id === id);
    const artistIndex = database.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (!artist) {
      throw new HttpException(`Artist was not found`, HttpStatus.NOT_FOUND);
    }

    if (dto.name && typeof dto.name !== 'string') {
      throw new HttpException(
        `Bad request. body does not contain required fields`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedArtist: Artist = {
      id: id,
      name: dto.name || artist.name,
      grammy: dto.grammy || artist.grammy,
    };

    database.artists[artistIndex] = updatedArtist;

    return database.artists[artistIndex];
  }

  deleteArtistById(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. artistId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artistIndex = database.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (artistIndex === -1) {
      throw new HttpException(`Artist was not found.`, HttpStatus.NOT_FOUND);
    }

    database.artists.splice(artistIndex, 1);

    database.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
    database.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
  }
}
