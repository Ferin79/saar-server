import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto.js';

// Using @nestjs/swagger PartialType instead of @nestjs/mapped-types for Swagger compatibility
export class UpdateUserDto extends PartialType(CreateUserDto) {}
