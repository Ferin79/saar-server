import { Module } from '@nestjs/common';
import { ChapterRepository } from '../chapter.repository';
import { ChapterRelationalRepository } from './repositories/chapter.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterEntity } from './entities/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity])],
  providers: [
    {
      provide: ChapterRepository,
      useClass: ChapterRelationalRepository,
    },
  ],
  exports: [ChapterRepository],
})
export class RelationalChapterPersistenceModule {}
