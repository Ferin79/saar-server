import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChapterSummary1747493473354 implements MigrationInterface {
  name = 'ChapterSummary1747493473354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chapter" ADD "summary" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "summary"`);
  }
}
