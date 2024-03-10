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
import { ArtistsService } from './artists.service';
import {
  CreateNewArtistDto,
  UpdateArtistDto,
} from 'src/dto/data-transfer-objects';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getArtistyId(@Param('id') id: string) {
    return this.artistsService.getArtistyId(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createNewArtist(@Body() dto: CreateNewArtistDto) {
    return this.artistsService.createNewArtist(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateArtistInfo(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    return this.artistsService.updateArtistInfo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistById(@Param('id') id: string) {
    return this.artistsService.deleteArtistById(id);
  }
}
