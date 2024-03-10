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

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTraks() {
    return this.tracksService.getAllTraks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
    return this.tracksService.getTrackById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNewTrackDto: CreateNewTrackDto) {
    return this.tracksService.addNewTrack(createNewTrackDto);
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
