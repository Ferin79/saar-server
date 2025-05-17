import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageEntity } from '../../../../languages/infrastructure/persistence/relational/entities/language.entity';
import { Repository } from 'typeorm';
import LanguagesData from './languages.json';

@Injectable()
export class LanguageSeedService {
  constructor(
    @InjectRepository(LanguageEntity)
    private repository: Repository<LanguageEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const languages = LanguagesData.map((language) => {
        return this.repository.create({
          name: language.name,
          code: language.code,
          is_active: language.is_active,
          native_name: language.native_name,
        });
      });

      await this.repository.save(languages);
    }
  }
}
