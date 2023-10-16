import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCatalogItem1697443737547 implements MigrationInterface {
    name = 'CreateCatalogItem1697443737547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "catalog_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "catalogId" integer, "productId" integer, CONSTRAINT "REL_e5c9c8166db100584a186abdb0" UNIQUE ("productId"), CONSTRAINT "PK_8996a1f608499554f35bec8601e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "catalog_item" ADD CONSTRAINT "FK_485c97a6cc38821d2cb5cba0e7d" FOREIGN KEY ("catalogId") REFERENCES "catalog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "catalog_item" ADD CONSTRAINT "FK_e5c9c8166db100584a186abdb0e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "catalog_item" DROP CONSTRAINT "FK_e5c9c8166db100584a186abdb0e"`);
        await queryRunner.query(`ALTER TABLE "catalog_item" DROP CONSTRAINT "FK_485c97a6cc38821d2cb5cba0e7d"`);
        await queryRunner.query(`DROP TABLE "catalog_item"`);
    }

}
