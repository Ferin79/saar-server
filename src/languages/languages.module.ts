import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { RelationalLanguagePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalLanguagePersistenceModule,
  ],
  controllers: [LanguagesController],
  providers: [LanguagesService],
  exports: [LanguagesService, RelationalLanguagePersistenceModule],
})
export class LanguagesModule {}
