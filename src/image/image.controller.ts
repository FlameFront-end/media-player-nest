import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageStorage } from '../storage';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('image')
@ApiTags('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: imageStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
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
    @UploadedFile()
    image: Express.Multer.File,
    @Body('title') title: string,
  ) {
    return this.imageService.create(image, title);
  }

  @Get()
  async findAll() {
    return this.imageService.findAll();
  }
}
