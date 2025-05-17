import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChapterTranslation1747496100668 implements MigrationInterface {
  name = 'ChapterTranslation1747496100668';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chapter_translation" ("description" character varying NOT NULL, "title" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "languageId" uuid NOT NULL, "chapterId" uuid NOT NULL, CONSTRAINT "UQ_071825f846f5edef4d02cf5d524" UNIQUE ("chapterId", "languageId"), CONSTRAINT "PK_a0f1cb3808f7eda704a2a8ecd0e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapter_translation" ADD CONSTRAINT "FK_6a856cf92079a5d6a8c6e582e9c" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapter_translation" ADD CONSTRAINT "FK_2955347c22214a3fa0fecbf8b27" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chapter_translation" DROP CONSTRAINT "FK_2955347c22214a3fa0fecbf8b27"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapter_translation" DROP CONSTRAINT "FK_6a856cf92079a5d6a8c6e582e9c"`,
    );
    await queryRunner.query(`DROP TABLE "chapter_translation"`);
  }
}
