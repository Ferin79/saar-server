import {
  // decorators here

  IsNumber,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateChapterDto {
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
