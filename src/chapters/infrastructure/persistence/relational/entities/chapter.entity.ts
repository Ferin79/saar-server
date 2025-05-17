import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  Index,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'chapter',
})
export class ChapterEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  summary: string;

  @ManyToMany(() => FileEntity, { eager: true, nullable: false })
  @JoinTable()
  images: FileEntity[];

  @Column({
    nullable: false,
    type: Number,
  })
  totalVerses: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('chapter_number_index')
  @Column({
    nullable: false,
    type: Number,
  })
  number: number;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
