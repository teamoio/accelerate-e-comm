import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderAddress1697442271426 implements MigrationInterface {
    name = 'CreateOrderAddress1697442271426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_address" ("id" SERIAL NOT NULL, "houseNumber" character varying NOT NULL, "streetName" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "postalCode" character varying NOT NULL, "isdefault" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "countryId" integer, "orderId" integer, CONSTRAINT "REL_6fc5ceaff6e4b0415495f684c8" UNIQUE ("countryId"), CONSTRAINT "PK_f07603e96b068aae820d4590270" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_address" ADD CONSTRAINT "FK_6fc5ceaff6e4b0415495f684c8e" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_address" ADD CONSTRAINT "FK_d82a2840b5e5c98c569d75e92e8" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_address" DROP CONSTRAINT "FK_d82a2840b5e5c98c569d75e92e8"`);
        await queryRunner.query(`ALTER TABLE "order_address" DROP CONSTRAINT "FK_6fc5ceaff6e4b0415495f684c8e"`);
        await queryRunner.query(`DROP TABLE "order_address"`);
    }

}
