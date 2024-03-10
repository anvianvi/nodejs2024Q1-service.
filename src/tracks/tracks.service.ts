import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { database } from 'src/database/storage';
import {
  CreateNewTrackDto,
  UpdateTrackDto,
} from 'src/dto/data-transfer-objects';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class TracksService {
  getAllTracks() {
    return database.tracks;
  }

  getTrackById(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. trackId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = database.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException(`Track was not found`, HttpStatus.NOT_FOUND);
    }

    return track;
  }

  createNewTrack(dto: CreateNewTrackDto) {
    if (
      !(dto.name && dto.duration) ||
      typeof dto.name !== 'string' ||
      typeof dto.duration !== 'number'
    ) {
      throw new HttpException(
        `Bad request. body does not contain required fields`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newTrack = {
      id: uuidv4(),
      name: dto.name,
      artistId: dto?.artistId,
      albumId: dto?.albumId,
      duration: dto.duration,
    };

    database.tracks.push(newTrack);

    return newTrack;
  }

  updateTrackInfo(id: string, dto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. trackId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = database.tracks.find((track) => track.id === id);
    const trackIndex = database.tracks.findIndex((track) => track.id === id);

    if (!track) {
      throw new HttpException(`Track was not found`, HttpStatus.NOT_FOUND);
    }

    if (
      !(dto.name && dto.duration) ||
      typeof dto?.name !== 'string' ||
      typeof dto?.duration !== 'number'
    ) {
      throw new HttpException(
        `Bad request. body does not contain required fields`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedTrack = {
      id: id,
      name: dto.name,
      artistId: dto?.artistId,
      albumId: dto?.albumId,
      duration: dto.duration,
    };

    database.tracks[trackIndex] = updatedTrack;

    return database.tracks[trackIndex];
  }

  deleteTrackById(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        `Bad request. trackId is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const trackIndex = database.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new HttpException(`Track was not found.`, HttpStatus.NOT_FOUND);
    }

    database.tracks.splice(trackIndex, 1);
  }
}
