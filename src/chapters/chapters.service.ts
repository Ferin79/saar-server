import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ChapterRepository } from './infrastructure/persistence/chapter.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Chapter } from './domain/chapter';

@Injectable()
export class ChaptersService {
  constructor(
    // Dependencies here
    private readonly chapterRepository: ChapterRepository,
  ) {}

  async create(createChapterDto: CreateChapterDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.chapterRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      totalVerses: createChapterDto.totalVerses,

      name: createChapterDto.name,

      number: createChapterDto.number,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.chapterRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Chapter['id']) {
    return this.chapterRepository.findById(id);
  }

  findByNumber(id: Chapter['id']) {
    return this.chapterRepository.findByNumber(id);
  }

  findByIds(ids: Chapter['id'][]) {
    return this.chapterRepository.findByIds(ids);
  }

  async update(
    id: Chapter['id'],

    updateChapterDto: UpdateChapterDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.chapterRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      totalVerses: updateChapterDto.totalVerses,

      name: updateChapterDto.name,

      number: updateChapterDto.number,
    });
  }

  remove(id: Chapter['id']) {
    return this.chapterRepository.remove(id);
  }
}
