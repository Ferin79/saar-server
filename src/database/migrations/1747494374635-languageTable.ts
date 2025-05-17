import { MigrationInterface, QueryRunner } from 'typeorm';

export class LanguageTable1747494374635 implements MigrationInterface {
  name = 'LanguageTable1747494374635';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "language" ("is_active" boolean NOT NULL, "native_name" character varying NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "language"`);
  }
}
