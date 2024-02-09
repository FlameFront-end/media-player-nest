import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TrackService } from './track.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { audioStorage } from './storage';

@Controller('files')
@ApiTags('files')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: audioStorage,
    }),
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
        title: {
          type: 'string',
        },
      },
    },
  })
  create(
    @UploadedFile()
    audio: Express.Multer.File,
    @Body('title') title: string,
  ) {
    return this.trackService.create(audio, title);
  }
}
