import {
  // decorators here

  IsString,
  IsBoolean,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateLanguageDto {
  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  native_name: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  code: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
