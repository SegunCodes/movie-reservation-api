/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsIn  } from 'class-validator';
import { ALLOWED_GENRES } from './movie-genres.dto';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(ALLOWED_GENRES, { message: `Category must be one of the following: ${ALLOWED_GENRES.join(', ')}` })
  category: string;

  @IsString()
  @IsNotEmpty()
  fileUrl: string;
}