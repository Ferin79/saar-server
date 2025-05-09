import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity.js';
import { ChapterTranslation } from './entities/chapter-translation.entity.js';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,

    @InjectRepository(ChapterTranslation)
    private chapterTranslationRepository: Repository<ChapterTranslation>,
  ) {}

  findAllChapters() {
    return this.chapterRepository.find({
      order: {
        id: 'ASC',
      },
      relations: ['translations', 'images'],
    });
  }

  async findOneChapter(id: number) {
    const chapter = await this.chapterRepository.findOne({
      where: { id },
      relations: ['translations', 'images'],
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }

    return chapter;
  }

  async findChapterBySlug(slug: string) {
    const chapter = await this.chapterRepository.findOne({
      where: { slug },
      relations: ['translations', 'images'],
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter with slug '${slug}' not found`);
    }

    return chapter;
  }

  async getChapterDetailsByIdAndLanguage(
    chapterId: number,
    languageCode: string,
  ) {
    const chapter = await this.chapterRepository.findOne({
      where: { id: chapterId },
      relations: ['images'],
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${chapterId} not found`);
    }

    const translation = await this.chapterTranslationRepository.findOne({
      where: {
        chapter: { id: chapterId },
        language: { code: languageCode },
      },
    });

    if (!translation) {
      throw new NotFoundException(
        `Translation for chapter ID ${chapterId} in language '${languageCode}' not found`,
      );
    }

    chapter.translations = [translation];

    return chapter;
  }
}
