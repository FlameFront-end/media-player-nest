import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TrackService } from './track.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { trackStorage } from '../storage';

@Controller('track')
@ApiTags('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'audio', maxCount: 1 },
        { name: 'image', maxCount: 1 },
      ],
      {
        storage: trackStorage,
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        audio: {
          type: 'string',
          format: 'binary',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
        },
      },
    },
  })
  create(
    @UploadedFiles()
    files: { audio: Express.Multer.File[]; image: Express.Multer.File[] },
    @Body('title') title: string,
  ) {
    console.log('files', files);
    return this.trackService.create(files.audio, files.image, title);
  }

  @Get()
  async findAll() {
    return this.trackService.findAll();
  }
}
