import { LanguagesModule } from '../languages/languages.module';
import { ChaptersModule } from '../chapters/chapters.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ChapterTranslationsService } from './chapter-translations.service';
import { ChapterTranslationsController } from './chapter-translations.controller';
import { RelationalChapterTranslationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    LanguagesModule,

    ChaptersModule,

    // do not remove this comment
    RelationalChapterTranslationPersistenceModule,
  ],
  controllers: [ChapterTranslationsController],
  providers: [ChapterTranslationsService],
  exports: [
    ChapterTranslationsService,
    RelationalChapterTranslationPersistenceModule,
  ],
})
export class ChapterTranslationsModule {}
