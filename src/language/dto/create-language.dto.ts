import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Direction } from '../entities/language.entity.js';

export class CreateLanguageDto {
  @ApiProperty({
    example: 'en',
    description: 'The language code (ISO code)',
    maxLength: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  code: string;

  @ApiProperty({
    example: 'English',
    description: 'The name of the language in English',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'हिन्दी',
    description: 'The name of the language in its native form',
    required: false,
  })
  @IsOptional()
  @IsString()
  native_name?: string;

  @ApiProperty({
    example: 'LTR',
    description: 'Text direction: Left-to-Right (LTR) or Right-to-Left (RTL)',
    enum: Direction,
    required: false,
    default: Direction.LTR,
  })
  @IsOptional()
  @IsEnum(Direction)
  direction?: Direction;

  @ApiProperty({
    example: true,
    description: 'Whether the language is active in the application',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
