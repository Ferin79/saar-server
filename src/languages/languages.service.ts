import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageRepository } from './infrastructure/persistence/language.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Language } from './domain/language';

@Injectable()
export class LanguagesService {
  constructor(
    // Dependencies here
    private readonly languageRepository: LanguageRepository,
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.languageRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      is_active: createLanguageDto.is_active,

      native_name: createLanguageDto.native_name,

      name: createLanguageDto.name,

      code: createLanguageDto.code,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.languageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Language['id']) {
    return this.languageRepository.findById(id);
  }

  findByIds(ids: Language['id'][]) {
    return this.languageRepository.findByIds(ids);
  }

  async update(
    id: Language['id'],

    updateLanguageDto: UpdateLanguageDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.languageRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      is_active: updateLanguageDto.is_active,

      native_name: updateLanguageDto.native_name,

      name: updateLanguageDto.name,

      code: updateLanguageDto.code,
    });
  }

  remove(id: Language['id']) {
    return this.languageRepository.remove(id);
  }
}
