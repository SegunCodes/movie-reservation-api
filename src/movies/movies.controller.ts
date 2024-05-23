/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addMovie(@Request() req, @Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie({ ...createMovieDto, userId: req.user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateMovie(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.updateMovie(id, updateMovieDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteMovie(@Param('id') id: number) {

    return this.moviesService.deleteMovie(id);
  }

  @Get('category')
  async getMoviesByCategory(@Query('category') category?: string) {
    if (category) {
      return this.moviesService.findMoviesByCategory(category);
    } else {
      return this.moviesService.findAllMovies();
    }
  }

  @Get('search')
  async searchMovies(@Query('query') query: string) {
    if (!query) {
        return [];
    }
    return this.moviesService.searchMovies(query);
  }

  @Get('stream/:id')
  async streamMovie(@Param('id') id: number) {
    // Logic to stream movie
    await this.moviesService.incrementStreamCount(id);
    return { message: `Streaming movie with id ${id}` };
  }

  @Get('download/:id')
  async downloadMovie(@Param('id') id: number) {
    // Logic to download movie
    await this.moviesService.incrementDownloadCount(id);
    return { message: `Downloading movie with id ${id}` };
  }
}
