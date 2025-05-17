import { NestFactory } from '@nestjs/core';
import { ChapterTranslationSeedService } from './chapter-translation/chapter-translation-seed.service';
import { LanguageSeedService } from './language/language-seed.service';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { ChapterSeedService } from './chapter/chapter-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(ChapterSeedService).run();

  await app.get(LanguageSeedService).run();

  await app.get(ChapterTranslationSeedService).run();

  await app.close();
};

void runSeed();
