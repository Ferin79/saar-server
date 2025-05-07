import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';
import { UserLoginType, UserRole } from '../entities/user.entity.js';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name: string;

  @ApiProperty({
    description:
      'User password (required for local login). Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
    example: 'Password1!',
    required: true,
    minLength: 8,
    maxLength: 100,
  })
  @ValidateIf((o) => o.loginType === UserLoginType.LOCAL)
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @Length(8, 100)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;

  @ApiProperty({
    description: 'URL to the user profile picture',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    description: 'ID from third-party authentication provider',
    example: 'google123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  thirdPartyId?: string;

  @ApiProperty({
    description: 'Login type for the user',
    enum: UserLoginType,
    default: UserLoginType.LOCAL,
    example: UserLoginType.LOCAL,
  })
  @IsEnum(UserLoginType, { message: 'Invalid login type' })
  loginType: UserLoginType = UserLoginType.LOCAL;

  @ApiProperty({
    description: 'Role assigned to the user',
    enum: UserRole,
    default: UserRole.USER,
    example: UserRole.USER,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Invalid user role' })
  role?: UserRole;
}
