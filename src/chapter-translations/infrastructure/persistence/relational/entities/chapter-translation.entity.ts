import { LanguageEntity } from '../../../../../languages/infrastructure/persistence/relational/entities/language.entity';

import { ChapterEntity } from '../../../../../chapters/infrastructure/persistence/relational/entities/chapter.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'chapter_translation',
})
@Unique(['chapter', 'language'])
export class ChapterTranslationEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  description: string;

  @Column({
    nullable: false,
    type: String,
  })
  title: string;

  @ManyToOne(() => LanguageEntity, { eager: true, nullable: false })
  language: LanguageEntity;

  @ManyToOne(() => ChapterEntity, { eager: true, nullable: false })
  chapter: ChapterEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
