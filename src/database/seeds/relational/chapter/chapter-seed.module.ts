import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterEntity } from '../../../../chapters/infrastructure/persistence/relational/entities/chapter.entity';
import { ChapterSeedService } from './chapter-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity])],
  providers: [ChapterSeedService],
  exports: [ChapterSeedService],
})
export class ChapterSeedModule {}
