import { FileType } from '../../files/domain/file';
import { ApiProperty } from '@nestjs/swagger';

export class Chapter {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  summary: string;

  @ApiProperty({
    type: () => [FileType],
    nullable: false,
  })
  images: FileType[];

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  totalVerses: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  number: number;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
