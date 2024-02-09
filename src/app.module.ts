import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'jelani.db.elephantsql.com',
      port: 5432,
      username: 'jisqzvwo',
      password: 'aRv2abMzeFwgyS-IKQrsRuq9JedHEUVh',
      database: 'jisqzvwo',
      entities: [Track],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Track]),
    TrackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
