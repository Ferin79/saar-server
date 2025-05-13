import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChapterIndex1747084811435 implements MigrationInterface {
  name = 'ChapterIndex1747084811435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "chapter_number_index" ON "chapter" ("number") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."chapter_number_index"`);
  }
}
