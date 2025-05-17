import { Module } from '@nestjs/common';
import { ChapterTranslationRepository } from '../chapter-translation.repository';
import { ChapterTranslationRelationalRepository } from './repositories/chapter-translation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterTranslationEntity } from './entities/chapter-translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterTranslationEntity])],
  providers: [
    {
      provide: ChapterTranslationRepository,
      useClass: ChapterTranslationRelationalRepository,
    },
  ],
  exports: [ChapterTranslationRepository],
})
export class RelationalChapterTranslationPersistenceModule {}
