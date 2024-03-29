import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly repository: Repository<Track>,
  ) {}

  async create(
    audio: Express.Multer.File[],
    image: Express.Multer.File[],
    title: string,
  ) {
    return this.repository.save({
      audio: audio[0].filename,
      image: image[0].filename,
      title,
    });
  }

  async findAll() {
    return this.repository.find();
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
