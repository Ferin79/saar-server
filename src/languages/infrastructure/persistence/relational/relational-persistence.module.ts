import { Module } from '@nestjs/common';
import { LanguageRepository } from '../language.repository';
import { LanguageRelationalRepository } from './repositories/language.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from './entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  providers: [
    {
      provide: LanguageRepository,
      useClass: LanguageRelationalRepository,
    },
  ],
  exports: [LanguageRepository],
})
export class RelationalLanguagePersistenceModule {}
