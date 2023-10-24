import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrder1697442211556 implements MigrationInterface {
    name = 'CreateOrder1697442211556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "total" integer NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "UQ_d09d285fe1645cd2f0db811e293" UNIQUE ("orderId")`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "UQ_d09d285fe1645cd2f0db811e293"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "orderId"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
