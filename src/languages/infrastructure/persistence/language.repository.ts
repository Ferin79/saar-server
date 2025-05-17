import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Language } from '../../domain/language';

export abstract class LanguageRepository {
  abstract create(
    data: Omit<Language, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Language>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Language[]>;

  abstract findById(id: Language['id']): Promise<NullableType<Language>>;

  abstract findByIds(ids: Language['id'][]): Promise<Language[]>;

  abstract update(
    id: Language['id'],
    payload: DeepPartial<Language>,
  ): Promise<Language | null>;

  abstract remove(id: Language['id']): Promise<void>;
}
