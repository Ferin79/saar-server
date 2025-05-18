import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Chapter } from '../../domain/chapter';

export abstract class ChapterRepository {
  abstract create(
    data: Omit<Chapter, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Chapter>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[Chapter[], number]>;

  abstract findById(id: Chapter['id']): Promise<NullableType<Chapter>>;

  abstract findByNumber(id: Chapter['id']): Promise<NullableType<Chapter>>;

  abstract findByIds(ids: Chapter['id'][]): Promise<Chapter[]>;

  abstract update(
    id: Chapter['id'],
    payload: DeepPartial<Chapter>,
  ): Promise<Chapter | null>;

  abstract remove(id: Chapter['id']): Promise<void>;
}
