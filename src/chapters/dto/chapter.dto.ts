import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChapterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
