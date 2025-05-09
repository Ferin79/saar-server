import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ChapterTranslation } from './chapter-translation.entity.js';
import { ChapterImage } from './chapter-image.entity.js';

@Entity('chapters')
export class Chapter extends BaseEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the chapter',
  })
  @Column({ primary: true, unique: true })
  id: number;

  @ApiProperty({
    example: 'karma-yoga',
    description: 'URL-friendly slug for the chapter',
    required: false,
    nullable: true,
  })
  @Column({ unique: true, nullable: true })
  slug: string;

  @ApiProperty({
    example: 'Karma Yoga',
    description: 'The title of the chapter',
  })
  @Column()
  name: string;

  @OneToMany(() => ChapterTranslation, (translation) => translation.chapter)
  translations: Relation<ChapterTranslation[]>;

  @OneToMany(() => ChapterImage, (image) => image.chapter)
  images: Relation<ChapterImage[]>;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;
}
