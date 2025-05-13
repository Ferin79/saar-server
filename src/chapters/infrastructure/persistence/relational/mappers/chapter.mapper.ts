import { Chapter } from '../../../../domain/chapter';

import { ChapterEntity } from '../entities/chapter.entity';

export class ChapterMapper {
  static toDomain(raw: ChapterEntity): Chapter {
    const domainEntity = new Chapter();
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
