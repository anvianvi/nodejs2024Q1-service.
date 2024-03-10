import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import {
  CreateNewTrackDto,
  UpdateTrackDto,
} from 'src/dto/data-transfer-objects';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTracks() {
    console.log('i try to get all traks');
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTrackById(@Param('id') id: string) {
    return this.tracksService.getTrackById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createNewTrack(@Body() createNewTrackDto: CreateNewTrackDto) {
    return this.tracksService.createNewTrack(createNewTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateTrackInfo(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.updateTrackInfo(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackById(@Param('id') id: string) {
    return this.tracksService.deleteTrackById(id);
  }
}
