import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterTranslationEntity } from '../../../../chapter-translations/infrastructure/persistence/relational/entities/chapter-translation.entity';
import { ChapterTranslationSeedService } from './chapter-translation-seed.service';
import { LanguageEntity } from '../../../../languages/infrastructure/persistence/relational/entities/language.entity';
import { ChapterEntity } from '../../../../chapters/infrastructure/persistence/relational/entities/chapter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChapterTranslationEntity,
      LanguageEntity,
      ChapterEntity,
    ]),
  ],
  providers: [ChapterTranslationSeedService],
  exports: [ChapterTranslationSeedService],
})
export class ChapterTranslationSeedModule {}
