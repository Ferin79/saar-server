import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Chapter } from './chapter.entity.js';

@Entity('chapter_images')
export class ChapterImage extends BaseEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the chapter image',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'https://example.com/images/karma-yoga.jpg',
    description: 'URL to the image file',
  })
  @Column({ name: 'image_url' })
  imageUrl: string;

  @ApiProperty({
    example: 'Artistic depiction of Arjuna and Krishna',
    description: 'Description or alt text for the image',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Chapter, (chapter) => chapter.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chapter_id', referencedColumnName: 'id' })
  chapter: Relation<Chapter>;
}
