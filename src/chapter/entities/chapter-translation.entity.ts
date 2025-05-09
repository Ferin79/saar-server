import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Language } from '../../language/entities/language.entity.js';
import { Chapter } from './chapter.entity.js';

@Entity('chapter_translations')
@Unique(['chapter', 'language'])
export class ChapterTranslation extends BaseEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the chapter translation',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Karma Yoga',
    description: 'The translated title of the chapter',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'The chapter about the yoga of action',
    description: 'The translated description of the chapter',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.translations, {
    onDelete: 'CASCADE',
  })
  chapter: Relation<Chapter>;

  @ManyToOne(() => Language, (lang) => lang.translations)
  language: Relation<Language>;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;
}
