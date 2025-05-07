import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export enum UserLoginType {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ description: 'The unique identifier of the user', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'URL to user profile picture',
    required: false,
    example: 'https://example.com/avatar.jpg',
  })
  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, select: false })
  password: string;

  @ApiProperty({
    description: 'ID from third-party auth provider',
    required: false,
    example: 'google123456',
  })
  @Column({ nullable: true })
  thirdPartyId: string;

  @ApiProperty({
    description: 'User login type',
    enum: UserLoginType,
    default: UserLoginType.LOCAL,
    example: UserLoginType.LOCAL,
  })
  @Column('enum', {
    enum: UserLoginType,
    default: UserLoginType.LOCAL,
  })
  loginType: UserLoginType;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    default: UserRole.USER,
    example: UserRole.USER,
  })
  @Column('enum', {
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ description: 'Timestamp when the user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the user was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (
      this.password &&
      this.loginType === UserLoginType.LOCAL &&
      !this.password.startsWith('$2b$')
    ) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    if (!this.password || this.loginType !== UserLoginType.LOCAL) {
      return false;
    }

    return bcrypt.compare(password, this.password);
  }
}
