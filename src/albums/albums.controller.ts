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
import { AlbumsService } from './albums.service';
import {
  CreateNewAlbumDto,
  UpdateAlbumDto,
} from 'src/dto/data-transfer-objects';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllAlbums() {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getAlbumById(@Param('id') id: string) {
    return this.albumsService.getAlbumById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createNewAlbum(@Body() dto: CreateNewAlbumDto) {
    return this.albumsService.createNewAlbum(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateAlbumInfo(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    return this.albumsService.updateAlbumInfo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumById(@Param('id') id: string) {
    return this.albumsService.deleteAlbumById(id);
  }
}
