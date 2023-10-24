import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCatalog1697443678892 implements MigrationInterface {
    name = 'CreateCatalog1697443678892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "catalog" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "discountRate" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_782754bded12b4e75ad4afff913" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "catalog" ADD CONSTRAINT "FK_6b0daca4bde404abcf88f305f03" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "catalog" DROP CONSTRAINT "FK_6b0daca4bde404abcf88f305f03"`);
        await queryRunner.query(`DROP TABLE "catalog"`);
    }

}
