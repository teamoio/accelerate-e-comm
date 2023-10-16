import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAddress1697441219738 implements MigrationInterface {
    name = 'CreateUserAddress1697441219738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_address" ("id" SERIAL NOT NULL, "houseNumber" character varying NOT NULL, "streetName" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "postalCode" character varying NOT NULL, "isdefault" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_address" ADD CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_address" DROP CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2"`);
        await queryRunner.query(`DROP TABLE "user_address"`);
    }

}
