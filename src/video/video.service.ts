import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly repository: Repository<Video>,
  ) {}

  async create(video: Express.Multer.File, title: string) {
    return this.repository.save({
      video: video.filename,
      title,
    });
  }

  async findAll() {
    return this.repository.find();
  }
}
