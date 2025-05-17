import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveSummaryColumn1747495160905 implements MigrationInterface {
  name = 'RemoveSummaryColumn1747495160905';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "summary"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chapter" ADD "summary" character varying NOT NULL`,
    );
  }
}
