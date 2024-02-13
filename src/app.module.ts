import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track/entities/track.entity';
import { ImageModule } from './image/image.module';
import { Image } from './image/entities/image.entity';
import { VideoModule } from './video/video.module';
import { Video } from './video/entities/video.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'jelani.db.elephantsql.com',
      port: 5432,
      username: 'jisqzvwo',
      password: 'aRv2abMzeFwgyS-IKQrsRuq9JedHEUVh',
      database: 'jisqzvwo',
      entities: [Track, Image, Video],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Track, Image, Video]),
    TrackModule,
    ImageModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
