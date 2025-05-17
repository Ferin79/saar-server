import { Language } from '../../../../domain/language';

import { LanguageEntity } from '../entities/language.entity';

export class LanguageMapper {
  static toDomain(raw: LanguageEntity): Language {
    const domainEntity = new Language();
    domainEntity.is_active = raw.is_active;

    domainEntity.native_name = raw.native_name;

    domainEntity.name = raw.name;

    domainEntity.code = raw.code;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Language): LanguageEntity {
    const persistenceEntity = new LanguageEntity();
    persistenceEntity.is_active = domainEntity.is_active;

    persistenceEntity.native_name = domainEntity.native_name;

    persistenceEntity.name = domainEntity.name;

    persistenceEntity.code = domainEntity.code;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
