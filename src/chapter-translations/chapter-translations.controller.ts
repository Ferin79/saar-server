import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ChapterTranslationsService } from './chapter-translations.service';
import { CreateChapterTranslationDto } from './dto/create-chapter-translation.dto';
import { UpdateChapterTranslationDto } from './dto/update-chapter-translation.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ChapterTranslation } from './domain/chapter-translation';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllChapterTranslationsDto } from './dto/find-all-chapter-translations.dto';

@ApiTags('Chaptertranslations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'chapter-translations',
  version: '1',
})
export class ChapterTranslationsController {
  constructor(
    private readonly chapterTranslationsService: ChapterTranslationsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: ChapterTranslation,
  })
  create(@Body() createChapterTranslationDto: CreateChapterTranslationDto) {
    return this.chapterTranslationsService.create(createChapterTranslationDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ChapterTranslation),
  })
  async findAll(
    @Query() query: FindAllChapterTranslationsDto,
  ): Promise<InfinityPaginationResponseDto<ChapterTranslation>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.chapterTranslationsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ChapterTranslation,
  })
  findById(@Param('id') id: string) {
    return this.chapterTranslationsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ChapterTranslation,
  })
  update(
    @Param('id') id: string,
    @Body() updateChapterTranslationDto: UpdateChapterTranslationDto,
  ) {
    return this.chapterTranslationsService.update(
      id,
      updateChapterTranslationDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.chapterTranslationsService.remove(id);
  }
}
