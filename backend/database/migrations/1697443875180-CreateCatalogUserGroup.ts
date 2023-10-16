import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCatalogUserGroup1697443875180 implements MigrationInterface {
    name = 'CreateCatalogUserGroup1697443875180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "catalog_user_group" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "catalogId" integer, "userId" integer, CONSTRAINT "PK_320fb63c9445c9f8e7967f3ae51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "catalog_user_group" ADD CONSTRAINT "FK_9fc982a5d9691d06c1f83bf9b32" FOREIGN KEY ("catalogId") REFERENCES "catalog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "catalog_user_group" ADD CONSTRAINT "FK_9fef4d976b6f9216d65f824f57b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "catalog_user_group" DROP CONSTRAINT "FK_9fef4d976b6f9216d65f824f57b"`);
        await queryRunner.query(`ALTER TABLE "catalog_user_group" DROP CONSTRAINT "FK_9fc982a5d9691d06c1f83bf9b32"`);
        await queryRunner.query(`DROP TABLE "catalog_user_group"`);
    }

}
