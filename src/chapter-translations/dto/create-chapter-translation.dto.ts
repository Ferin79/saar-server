import { LanguageDto } from '../../languages/dto/language.dto';

import { ChapterDto } from '../../chapters/dto/chapter.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateChapterTranslationDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: () => LanguageDto,
  })
  @ValidateNested()
  @Type(() => LanguageDto)
  @IsNotEmptyObject()
  language: LanguageDto;

  @ApiProperty({
    required: true,
    type: () => ChapterDto,
  })
  @ValidateNested()
  @Type(() => ChapterDto)
  @IsNotEmptyObject()
  chapter: ChapterDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
