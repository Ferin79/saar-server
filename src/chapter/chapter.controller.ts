import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChapterService } from './chapter.service.js';
import { Chapter } from './entities/chapter.entity.js';

@ApiTags('chapters')
@Controller('chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @ApiOperation({ summary: 'Get all chapters' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of all available chapters',
    type: [Chapter],
  })
  @Get()
  findAll() {
    return this.chapterService.findAllChapters();
  }

  @ApiOperation({ summary: 'Get chapter by ID' })
  @ApiParam({ name: 'id', description: 'The chapter ID', example: '1' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the chapter with the specified ID',
    type: Chapter,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Chapter not found',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.chapterService.findOneChapter(id);
  }

  @ApiOperation({ summary: 'Get chapter by slug' })
  @ApiParam({
    name: 'slug',
    description: 'The chapter slug',
    example: 'karma-yoga',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the chapter with the specified slug',
    type: Chapter,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Chapter not found',
  })
  @Get('by-slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.chapterService.findChapterBySlug(slug);
  }

  @ApiOperation({
    summary: 'Get complete chapter details by ID and language',
    description:
      'Returns a chapter with its translations and images for a specific language',
  })
  @ApiParam({ name: 'id', description: 'The chapter ID', example: '1' })
  @ApiParam({
    name: 'languageCode',
    description: 'The language code',
    example: 'en',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Returns the complete chapter details including translation and images',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Chapter or translation not found',
  })
  @Get(':id/language/:languageCode')
  getChapterDetails(
    @Param('id', ParseIntPipe) id: number,
    @Param('languageCode') languageCode: string,
  ) {
    return this.chapterService.getChapterDetailsByIdAndLanguage(
      id,
      languageCode,
    );
  }
}
