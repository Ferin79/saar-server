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
import { ChaptersService } from './chapters.service';
import { Chapter } from './domain/chapter';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { FindAllChaptersDto } from './dto/find-all-chapters.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@ApiTags('Chapters')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'chapters',
  version: '1',
})
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @Post()
  @ApiCreatedResponse({
    type: Chapter,
  })
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Chapter),
  })
  async findAll(
    @Query() query: FindAllChaptersDto,
  ): Promise<InfinityPaginationResponseDto<Chapter>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const [data, total] = await this.chaptersService.findAllWithPagination({
      paginationOptions: {
        page,
        limit,
      },
    });

    return infinityPagination(data, { page, limit, total });
  }

  @Get('/number/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Chapter,
  })
  findByNumber(@Param('id') id: string) {
    return this.chaptersService.findByNumber(id);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Chapter,
  })
  findById(@Param('id') id: string) {
    return this.chaptersService.findById(id);
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
    type: Chapter,
  })
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(id, updateChapterDto);
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
    return this.chaptersService.remove(id);
  }
}
