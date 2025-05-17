import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChapterImages1747490902924 implements MigrationInterface {
  name = 'ChapterImages1747490902924';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chapter_images_file" ("chapterId" uuid NOT NULL, "fileId" uuid NOT NULL, CONSTRAINT "PK_e0e8573f8a4576b742413dc2397" PRIMARY KEY ("chapterId", "fileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7d63fdf354626670416746fc2d" ON "chapter_images_file" ("chapterId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9407cce61f71f9726145775f98" ON "chapter_images_file" ("fileId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "chapter_images_file" ADD CONSTRAINT "FK_7d63fdf354626670416746fc2d5" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapter_images_file" ADD CONSTRAINT "FK_9407cce61f71f9726145775f98a" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chapter_images_file" DROP CONSTRAINT "FK_9407cce61f71f9726145775f98a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapter_images_file" DROP CONSTRAINT "FK_7d63fdf354626670416746fc2d5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9407cce61f71f9726145775f98"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7d63fdf354626670416746fc2d"`,
    );
    await queryRunner.query(`DROP TABLE "chapter_images_file"`);
  }
}
