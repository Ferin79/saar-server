import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ChapterTranslation } from '../../domain/chapter-translation';

export abstract class ChapterTranslationRepository {
  abstract create(
    data: Omit<ChapterTranslation, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ChapterTranslation>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ChapterTranslation[]>;

  abstract findById(
    id: ChapterTranslation['id'],
  ): Promise<NullableType<ChapterTranslation>>;

  abstract findByIds(
    ids: ChapterTranslation['id'][],
  ): Promise<ChapterTranslation[]>;

  abstract update(
    id: ChapterTranslation['id'],
    payload: DeepPartial<ChapterTranslation>,
  ): Promise<ChapterTranslation | null>;

  abstract remove(id: ChapterTranslation['id']): Promise<void>;
}
