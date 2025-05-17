import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChapterTranslationEntity } from '../../../../chapter-translations/infrastructure/persistence/relational/entities/chapter-translation.entity';
import { Repository } from 'typeorm';
import { LanguageEntity } from '../../../../languages/infrastructure/persistence/relational/entities/language.entity';
import Data from './chapter-translation.json';
import { ChapterEntity } from '../../../../chapters/infrastructure/persistence/relational/entities/chapter.entity';

@Injectable()
export class ChapterTranslationSeedService {
  constructor(
    @InjectRepository(ChapterTranslationEntity)
    private repository: Repository<ChapterTranslationEntity>,

    @InjectRepository(LanguageEntity)
    private langRepository: Repository<LanguageEntity>,

    @InjectRepository(ChapterEntity)
    private chapterRepository: Repository<ChapterEntity>,
  ) {}

  async run() {
    const chapters = await this.chapterRepository.find();

    const enCount = await this.repository.count({
      where: {
        language: {
          code: 'en',
        },
      },
    });

    if (enCount === 0) {
      const enLang = await this.langRepository.findOne({
        where: {
          code: 'en',
        },
      });

      if (!enLang) {
        throw new Error('English language not found');
      }

      const chapterTranslations = Data.en.map((chapter) => {
        return this.repository.create({
          title: chapter.title,
          description: chapter.description,
          chapter: chapters.find((i) => i.number === chapter.chapter_number),
          language: enLang,
        });
      });

      await this.repository.save(chapterTranslations);
    }

    const hiCount = await this.repository.count({
      where: {
        language: {
          code: 'hi',
        },
      },
    });

    if (hiCount === 0) {
      const hiLang = await this.langRepository.findOne({
        where: {
          code: 'hi',
        },
      });

      if (!hiLang) {
        throw new Error('Hindi language not found');
      }

      const chapterTranslations = Data.hi.map((chapter) => {
        return this.repository.create({
          title: chapter.title,
          description: chapter.description,
          chapter: chapters.find((i) => i.number === chapter.chapter_number),
          language: hiLang,
        });
      });
      await this.repository.save(chapterTranslations);
    }

    const guCount = await this.repository.count({
      where: {
        language: {
          code: 'gu',
        },
      },
    });

    if (guCount === 0) {
      const guLang = await this.langRepository.findOne({
        where: {
          code: 'gu',
        },
      });

      if (!guLang) {
        throw new Error('Gujarati language not found');
      }

      const chapterTranslations = Data.gu.map((chapter) => {
        return this.repository.create({
          title: chapter.title,
          description: chapter.description,
          chapter: chapters.find((i) => i.number === chapter.chapter_number),
          language: guLang,
        });
      });
      await this.repository.save(chapterTranslations);
    }
  }
}
