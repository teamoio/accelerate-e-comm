import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryImage1697442646470 implements MigrationInterface {
    name = 'CreateCategoryImage1697442646470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category_image" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_dc252738f70366595ac88f5a98f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category_image" ADD CONSTRAINT "FK_fee432657fcc012a979d8a102d4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_image" DROP CONSTRAINT "FK_fee432657fcc012a979d8a102d4"`);
        await queryRunner.query(`DROP TABLE "category_image"`);
    }

}
