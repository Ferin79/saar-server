import { Chapter } from '../../../../domain/chapter';

import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';

import { ChapterEntity } from '../entities/chapter.entity';

export class ChapterMapper {
  static toDomain(raw: ChapterEntity): Chapter {
    const domainEntity = new Chapter();

    if (raw.images) {
      domainEntity.images = raw.images.map((item) => FileMapper.toDomain(item));
    }

    domainEntity.totalVerses = raw.totalVerses;

    domainEntity.name = raw.name;

    domainEntity.number = raw.number;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Chapter): ChapterEntity {
    const persistenceEntity = new ChapterEntity();

    if (domainEntity.images) {
      persistenceEntity.images = domainEntity.images.map((item) =>
        FileMapper.toPersistence(item),
      );
    }

    persistenceEntity.totalVerses = domainEntity.totalVerses;

    persistenceEntity.name = domainEntity.name;

    persistenceEntity.number = domainEntity.number;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
