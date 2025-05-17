import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from '../../../../languages/infrastructure/persistence/relational/entities/language.entity';
import { LanguageSeedService } from './language-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  providers: [LanguageSeedService],
  exports: [LanguageSeedService],
})
export class LanguageSeedModule {}
