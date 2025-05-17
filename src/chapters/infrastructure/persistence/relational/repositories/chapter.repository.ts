import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ChapterEntity } from '../entities/chapter.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Chapter } from '../../../../domain/chapter';
import { ChapterRepository } from '../../chapter.repository';
import { ChapterMapper } from '../mappers/chapter.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ChapterRelationalRepository implements ChapterRepository {
  constructor(
    @InjectRepository(ChapterEntity)
    private readonly chapterRepository: Repository<ChapterEntity>,
  ) {}

  async create(data: Chapter): Promise<Chapter> {
    const persistenceModel = ChapterMapper.toPersistence(data);
    const newEntity = await this.chapterRepository.save(
      this.chapterRepository.create(persistenceModel),
    );
    return ChapterMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Chapter[]> {
    const entities = await this.chapterRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      order: { number: 'ASC' },
    });

    return entities.map((entity) => ChapterMapper.toDomain(entity));
  }

  async findById(id: Chapter['id']): Promise<NullableType<Chapter>> {
    const entity = await this.chapterRepository.findOne({
      where: { id },
    });

    return entity ? ChapterMapper.toDomain(entity) : null;
  }

  async findByNumber(id: Chapter['id']): Promise<NullableType<Chapter>> {
    const entity = await this.chapterRepository.findOne({
      where: { number: +id },
    });

    return entity ? ChapterMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Chapter['id'][]): Promise<Chapter[]> {
    const entities = await this.chapterRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ChapterMapper.toDomain(entity));
  }

  async update(id: Chapter['id'], payload: Partial<Chapter>): Promise<Chapter> {
    const entity = await this.chapterRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.chapterRepository.save(
      this.chapterRepository.create(
        ChapterMapper.toPersistence({
          ...ChapterMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ChapterMapper.toDomain(updatedEntity);
  }

  async remove(id: Chapter['id']): Promise<void> {
    await this.chapterRepository.delete(id);
  }
}
