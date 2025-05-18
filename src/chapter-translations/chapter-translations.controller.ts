import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { ChapterTranslationsService } from './chapter-translations.service';
import { ChapterTranslation } from './domain/chapter-translation';
import { CreateChapterTranslationDto } from './dto/create-chapter-translation.dto';
import { FindAllChapterTranslationsDto } from './dto/find-all-chapter-translations.dto';
import { UpdateChapterTranslationDto } from './dto/update-chapter-translation.dto';

@ApiTags('Chapter Translations')
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

  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
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

    const [data, total] =
      await this.chapterTranslationsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      });

    return infinityPagination(data, { page, limit, total });
  }

  // Get translation by langauage and chapter number
  @Get(':chapterNumber/language/:languageCode')
  @ApiParam({
    name: 'chapterNumber',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'languageCode',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ChapterTranslation,
  })
  findByChapterAndLanguage(
    @Param('chapterNumber') chapterNumber: string,
    @Param('languageCode') languageCode: string,
  ): Promise<ChapterTranslation> {
    return this.chapterTranslationsService.findByChapterAndLanguage(
      +chapterNumber,
      languageCode,
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

  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
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

  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
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
