/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async createMovie(data: {
    title: string;
    description: string;
    category: string;
    fileUrl: string;
    userId: number;
  }): Promise<Movie> {
    return this.prisma.movie.create({ data });
  }

  async updateMovie(id: number, data: Partial<Movie>): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id },
      data,
    });
  }

  async deleteMovie(id: number): Promise<Movie> {
    return this.prisma.movie.delete({
      where: { id },
    });
  }

  async findMoviesByCategory(category: string): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      where: { category },
    });
  }

  async findAllMovies() {
    return this.prisma.movie.findMany();
  }

  async searchMovies(query: string): Promise<Movie[]> {

    const queryLowerCase = `%${query.toLowerCase()}%`;
    return this.prisma.$queryRaw<Movie[]>`
      SELECT * FROM \`Movie\`
      WHERE LOWER(\`title\`) LIKE ${queryLowerCase}
      OR LOWER(\`description\`) LIKE ${queryLowerCase}
    `;
  }
  
  async incrementStreamCount(movieId: number): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id: movieId },
      data: { streamCount: { increment: 1 } },
    });
  }

  async incrementDownloadCount(movieId: number): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id: movieId },
      data: { downloadCount: { increment: 1 } },
    });
  }
}