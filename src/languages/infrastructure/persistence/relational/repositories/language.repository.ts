import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { LanguageEntity } from '../entities/language.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Language } from '../../../../domain/language';
import { LanguageRepository } from '../../language.repository';
import { LanguageMapper } from '../mappers/language.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class LanguageRelationalRepository implements LanguageRepository {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languageRepository: Repository<LanguageEntity>,
  ) {}

  async create(data: Language): Promise<Language> {
    const persistenceModel = LanguageMapper.toPersistence(data);
    const newEntity = await this.languageRepository.save(
      this.languageRepository.create(persistenceModel),
    );
    return LanguageMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[Language[], number]> {
    const [entities, total] = await this.languageRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return [entities.map((entity) => LanguageMapper.toDomain(entity)), total];
  }

  async findById(id: Language['id']): Promise<NullableType<Language>> {
    const entity = await this.languageRepository.findOne({
      where: { id },
    });

    return entity ? LanguageMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Language['id'][]): Promise<Language[]> {
    const entities = await this.languageRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => LanguageMapper.toDomain(entity));
  }

  async update(
    id: Language['id'],
    payload: Partial<Language>,
  ): Promise<Language> {
    const entity = await this.languageRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.languageRepository.save(
      this.languageRepository.create(
        LanguageMapper.toPersistence({
          ...LanguageMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return LanguageMapper.toDomain(updatedEntity);
  }

  async remove(id: Language['id']): Promise<void> {
    await this.languageRepository.delete(id);
  }
}
