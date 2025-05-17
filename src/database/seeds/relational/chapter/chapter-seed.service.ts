import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChapterEntity } from '../../../../chapters/infrastructure/persistence/relational/entities/chapter.entity';
import ChaptersData from './chapters.json';

@Injectable()
export class ChapterSeedService {
  constructor(
    @InjectRepository(ChapterEntity)
    private repository: Repository<ChapterEntity>,
  ) {}

  async run() {
    const countChapter = await this.repository.count();

    if (!countChapter) {
      const chapters = ChaptersData.map((chapter) => {
        return this.repository.create({
          number: chapter.number,
          name: chapter.title_sanskrit,
          totalVerses: chapter.verse_count,
          images: [
            {
              path: 'app/658d77b6c343d25a8d8bd.png',
              id: '9535ee19-a8ea-47a5-8fb4-84cd1f385de2',
            },
          ],
        });
      });

      await this.repository.save(chapters);
    }
  }
}
