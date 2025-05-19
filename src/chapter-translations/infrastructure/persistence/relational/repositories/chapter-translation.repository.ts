import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ChapterTranslationEntity } from '../entities/chapter-translation.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ChapterTranslation } from '../../../../domain/chapter-translation';
import { ChapterTranslationRepository } from '../../chapter-translation.repository';
import { ChapterTranslationMapper } from '../mappers/chapter-translation.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ChapterTranslationRelationalRepository
  implements ChapterTranslationRepository
{
  constructor(
    @InjectRepository(ChapterTranslationEntity)
    private readonly chapterTranslationRepository: Repository<ChapterTranslationEntity>,
  ) {}

  async create(data: ChapterTranslation): Promise<ChapterTranslation> {
    const persistenceModel = ChapterTranslationMapper.toPersistence(data);
    const newEntity = await this.chapterTranslationRepository.save(
      this.chapterTranslationRepository.create(persistenceModel),
    );
    return ChapterTranslationMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[ChapterTranslation[], number]> {
    const [entities, total] =
      await this.chapterTranslationRepository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        order: { chapter: { number: 'ASC' } },
      });

    return [
      entities.map((entity) => ChapterTranslationMapper.toDomain(entity)),
      total,
    ];
  }

  async findById(
    id: ChapterTranslation['id'],
  ): Promise<NullableType<ChapterTranslation>> {
    const entity = await this.chapterTranslationRepository.findOne({
      where: { id },
    });

    return entity ? ChapterTranslationMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: ChapterTranslation['id'][],
  ): Promise<ChapterTranslation[]> {
    const entities = await this.chapterTranslationRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ChapterTranslationMapper.toDomain(entity));
  }

  async findByChapterAndLanguage(
    chapterNumber: number,
    languageCode: string,
  ): Promise<ChapterTranslation> {
    const entity = await this.chapterTranslationRepository.findOne({
      where: {
        chapter: { number: chapterNumber },
        language: { code: languageCode },
      },
      relations: ['chapter', 'language'],
    });
    if (!entity) {
      throw new NotFoundException('Record not found');
    }
    return ChapterTranslationMapper.toDomain(entity);
  }

  async update(
    id: ChapterTranslation['id'],
    payload: Partial<ChapterTranslation>,
  ): Promise<ChapterTranslation> {
    const entity = await this.chapterTranslationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException('Record not found');
    }

    const updatedEntity = await this.chapterTranslationRepository.save(
      this.chapterTranslationRepository.create(
        ChapterTranslationMapper.toPersistence({
          ...ChapterTranslationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ChapterTranslationMapper.toDomain(updatedEntity);
  }

  async remove(id: ChapterTranslation['id']): Promise<void> {
    await this.chapterTranslationRepository.delete(id);
  }
}
