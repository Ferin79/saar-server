import { FilesService } from '../files/files.service';
import { FileType } from '../files/domain/file';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ChapterRepository } from './infrastructure/persistence/chapter.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Chapter } from './domain/chapter';

@Injectable()
export class ChaptersService {
  constructor(
    private readonly fileService: FilesService,

    // Dependencies here
    private readonly chapterRepository: ChapterRepository,
  ) {}

  async create(createChapterDto: CreateChapterDto) {
    // Do not remove comment below.
    // <creating-property />

    const imagesObjects = await this.fileService.findByIds(
      createChapterDto.images.map((entity) => entity.id),
    );
    if (imagesObjects.length !== createChapterDto.images.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          images: 'notExists',
        },
      });
    }
    const images = imagesObjects;

    return this.chapterRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      summary: createChapterDto.summary,

      images,

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

    let images: FileType[] | undefined = undefined;

    if (updateChapterDto.images) {
      const imagesObjects = await this.fileService.findByIds(
        updateChapterDto.images.map((entity) => entity.id),
      );
      if (imagesObjects.length !== updateChapterDto.images.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            images: 'notExists',
          },
        });
      }
      images = imagesObjects;
    }

    return this.chapterRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      summary: updateChapterDto.summary,

      images,

      totalVerses: updateChapterDto.totalVerses,

      name: updateChapterDto.name,

      number: updateChapterDto.number,
    });
  }

  remove(id: Chapter['id']) {
    return this.chapterRepository.remove(id);
  }
}
