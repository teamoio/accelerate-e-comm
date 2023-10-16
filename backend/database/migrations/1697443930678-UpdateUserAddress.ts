import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAddress1697443930678 implements MigrationInterface {
    name = 'UpdateUserAddress1697443930678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_address" ADD "countryId" integer`);
        await queryRunner.query(`ALTER TABLE "user_address" ADD CONSTRAINT "UQ_c82c2faa0ad2b5a847cc01887e4" UNIQUE ("countryId")`);
        await queryRunner.query(`ALTER TABLE "user_address" ADD CONSTRAINT "FK_c82c2faa0ad2b5a847cc01887e4" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_address" DROP CONSTRAINT "FK_c82c2faa0ad2b5a847cc01887e4"`);
        await queryRunner.query(`ALTER TABLE "user_address" DROP CONSTRAINT "UQ_c82c2faa0ad2b5a847cc01887e4"`);
        await queryRunner.query(`ALTER TABLE "user_address" DROP COLUMN "countryId"`);
    }

}
