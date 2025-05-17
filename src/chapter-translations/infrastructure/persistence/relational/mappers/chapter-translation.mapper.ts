import { ChapterTranslation } from '../../../../domain/chapter-translation';

import { LanguageMapper } from '../../../../../languages/infrastructure/persistence/relational/mappers/language.mapper';

import { ChapterMapper } from '../../../../../chapters/infrastructure/persistence/relational/mappers/chapter.mapper';

import { ChapterTranslationEntity } from '../entities/chapter-translation.entity';

export class ChapterTranslationMapper {
  static toDomain(raw: ChapterTranslationEntity): ChapterTranslation {
    const domainEntity = new ChapterTranslation();
    domainEntity.description = raw.description;

    domainEntity.title = raw.title;

    if (raw.language) {
      domainEntity.language = LanguageMapper.toDomain(raw.language);
    }

    if (raw.chapter) {
      domainEntity.chapter = ChapterMapper.toDomain(raw.chapter);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: ChapterTranslation,
  ): ChapterTranslationEntity {
    const persistenceEntity = new ChapterTranslationEntity();
    persistenceEntity.description = domainEntity.description;

    persistenceEntity.title = domainEntity.title;

    if (domainEntity.language) {
      persistenceEntity.language = LanguageMapper.toPersistence(
        domainEntity.language,
      );
    }

    if (domainEntity.chapter) {
      persistenceEntity.chapter = ChapterMapper.toPersistence(
        domainEntity.chapter,
      );
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
