import { LanguagesService } from '../languages/languages.service';
import { Language } from '../languages/domain/language';

import { ChaptersService } from '../chapters/chapters.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateChapterTranslationDto } from './dto/create-chapter-translation.dto';
import { UpdateChapterTranslationDto } from './dto/update-chapter-translation.dto';
import { ChapterTranslationRepository } from './infrastructure/persistence/chapter-translation.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ChapterTranslation } from './domain/chapter-translation';

@Injectable()
export class ChapterTranslationsService {
  constructor(
    private readonly languageService: LanguagesService,

    private readonly chapterService: ChaptersService,

    // Dependencies here
    private readonly chapterTranslationRepository: ChapterTranslationRepository,
  ) {}

  async create(createChapterTranslationDto: CreateChapterTranslationDto) {
    // Do not remove comment below.
    // <creating-property />

    const languageObject = await this.languageService.findById(
      createChapterTranslationDto.language.id,
    );
    if (!languageObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          language: 'notExists',
        },
      });
    }
    const language = languageObject;

    const chapterObject = await this.chapterService.findById(
      createChapterTranslationDto.chapter.id,
    );
    if (!chapterObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          chapter: 'notExists',
        },
      });
    }
    const chapter = chapterObject;

    return this.chapterTranslationRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      description: createChapterTranslationDto.description,

      title: createChapterTranslationDto.title,

      language,

      chapter,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.chapterTranslationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ChapterTranslation['id']) {
    return this.chapterTranslationRepository.findById(id);
  }

  findByIds(ids: ChapterTranslation['id'][]) {
    return this.chapterTranslationRepository.findByIds(ids);
  }

  async update(
    id: ChapterTranslation['id'],

    updateChapterTranslationDto: UpdateChapterTranslationDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let language: Language | undefined = undefined;

    if (updateChapterTranslationDto.language) {
      const languageObject = await this.languageService.findById(
        updateChapterTranslationDto.language.id,
      );
      if (!languageObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            language: 'notExists',
          },
        });
      }
      language = languageObject;
    }

    let chapter: Chapter | undefined = undefined;

    if (updateChapterTranslationDto.chapter) {
      const chapterObject = await this.chapterService.findById(
        updateChapterTranslationDto.chapter.id,
      );
      if (!chapterObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            chapter: 'notExists',
          },
        });
      }
      chapter = chapterObject;
    }

    return this.chapterTranslationRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateChapterTranslationDto.description,

      title: updateChapterTranslationDto.title,

      language,

      chapter,
    });
  }

  remove(id: ChapterTranslation['id']) {
    return this.chapterTranslationRepository.remove(id);
  }
}
