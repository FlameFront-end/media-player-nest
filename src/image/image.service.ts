import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly repository: Repository<Image>,
  ) {}

  async create(image: Express.Multer.File, title: string) {
    return this.repository.save({
      image: image.filename,
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
