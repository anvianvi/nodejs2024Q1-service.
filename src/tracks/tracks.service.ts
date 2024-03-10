import { Injectable } from '@nestjs/common';
import {
  CreateNewTrackDto,
  UpdateTrackDto,
} from 'src/dto/data-transfer-objects';

@Injectable()
export class TracksService {
  getAllTraks() {
    return `This action returns all tracks`;
  }

  getTrackById(id: string) {
    return `This action returns a #${id} track`;
    //     Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
    // Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist
  }

  addNewTrack(createNewTrackDto: CreateNewTrackDto) {
    // Server should answer with status code 400 and corresponding message if request body does not contain required fields

    return `This action adds a new track ${createNewTrackDto}`;
  }

  updateTrackInfo(id: string, updateTrackDto: UpdateTrackDto) {
    //  Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
    // Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist
    return `This action updates a #${updateTrackDto + id} track`;
  }

  deleteTrackById(id: string) {
    //     Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
    // Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist
    return `This action removes a #${id} track`;
  }
}
