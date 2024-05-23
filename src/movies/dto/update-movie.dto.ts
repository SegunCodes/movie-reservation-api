/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsIn } from 'class-validator';
import { ALLOWED_GENRES } from './movie-genres.dto';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(ALLOWED_GENRES, { message: `Category must be one of the following: ${ALLOWED_GENRES.join(', ')}` })
  category?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;
}
