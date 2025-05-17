import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LanguageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
