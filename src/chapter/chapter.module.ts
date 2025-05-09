import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterController } from './chapter.controller.js';
import { ChapterService } from './chapter.service.js';
import { Chapter } from './entities/chapter.entity.js';
import { ChapterTranslation } from './entities/chapter-translation.entity.js';
import { ChapterImage } from './entities/chapter-image.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chapter, ChapterTranslation, ChapterImage]),
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
  exports: [ChapterService],
})
export class ChapterModule {}
