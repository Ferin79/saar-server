import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum Direction {
  LTR = 'LTR',
  RTL = 'RTL',
}

@Entity('languages')
export class Language extends BaseEntity {
  @ApiProperty({
    example: 'en',
    description: 'The language code (ISO code)',
    maxLength: 10,
  })
  @PrimaryColumn({ length: 10 })
  code: string;

  @ApiProperty({
    example: 'English',
    description: 'The name of the language in English',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'हिन्दी',
    description: 'The name of the language in its native form',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  native_name: string;

  @ApiProperty({
    example: 'LTR',
    description: 'Text direction: Left-to-Right (LTR) or Right-to-Left (RTL)',
    enum: Direction,
    default: Direction.LTR,
  })
  @Column({
    type: 'enum',
    enum: Direction,
    default: Direction.LTR,
  })
  direction: Direction;

  @ApiProperty({
    example: true,
    description: 'Whether the language is active in the application',
    default: true,
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    description: 'The date and time when the language was created',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the language was last updated',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
