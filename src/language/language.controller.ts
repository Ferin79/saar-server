import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageService } from './language.service.js';
import { Language } from './entities/language.entity.js';

@ApiTags('languages')
@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({ summary: 'Get all languages' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of all available languages',
    type: [Language],
  })
  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @ApiOperation({ summary: 'Get language by code' })
  @ApiParam({
    name: 'code',
    description: 'The language code (e.g. en, hi, gu)',
    example: 'en',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the language with the specified code',
    type: Language,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Language not found',
  })
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.languageService.findOne(code);
  }
}
