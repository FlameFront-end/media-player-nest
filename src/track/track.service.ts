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

  async create(audio: Express.Multer.File, title: string) {
    return this.repository.save({
      audio: audio.filename,
      title,
    });
  }
}
