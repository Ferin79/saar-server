import { Language } from '../../languages/domain/language';
import { Chapter } from '../../chapters/domain/chapter';
import { ApiProperty } from '@nestjs/swagger';

export class ChapterTranslation {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  description: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: () => Language,
    nullable: false,
  })
  language: Language;

  @ApiProperty({
    type: () => Chapter,
    nullable: false,
  })
  chapter: Chapter;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
