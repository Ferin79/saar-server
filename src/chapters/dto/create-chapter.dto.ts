import { FileDto } from '../../files/dto/file.dto';

import {
  // decorators here

  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateChapterDto {
  @ApiProperty({
    required: true,
    type: () => [FileDto],
  })
  @ValidateNested()
  @Type(() => FileDto)
  @IsArray()
  images: FileDto[];

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  number: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  totalVerses: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
