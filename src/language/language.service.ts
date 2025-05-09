import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity.js';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  findAll() {
    return this.languageRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(code: string) {
    const language = await this.languageRepository.findOne({
      where: { code },
    });

    if (!language) {
      throw new NotFoundException(`Language with code ${code} not found`);
    }

    return language;
  }
}
