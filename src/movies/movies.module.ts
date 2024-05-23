/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MoviesController } from './movies.controller';

@Module({
  imports: [PrismaModule],
  providers: [MoviesService],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule {}