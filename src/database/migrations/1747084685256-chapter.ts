import { MigrationInterface, QueryRunner } from 'typeorm';

export class Chapter1747084685256 implements MigrationInterface {
  name = 'Chapter1747084685256';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chapter" ("totalVerses" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "chapter"`);
  }
}
