import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedCountryEntity1698824520589 implements MigrationInterface {
    name = 'RemovedCountryEntity1698824520589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_address" DROP CONSTRAINT "UQ_c82c2faa0ad2b5a847cc01887e4"`);
        await queryRunner.query(`ALTER TABLE "user_address" DROP COLUMN "countryId"`);
        await queryRunner.query(`ALTER TABLE "order_address" DROP CONSTRAINT "REL_6fc5ceaff6e4b0415495f684c8"`);
        await queryRunner.query(`ALTER TABLE "order_address" DROP COLUMN "countryId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_address" ADD "countryId" integer`);
        await queryRunner.query(`ALTER TABLE "order_address" ADD CONSTRAINT "REL_6fc5ceaff6e4b0415495f684c8" UNIQUE ("countryId")`);
        await queryRunner.query(`ALTER TABLE "user_address" ADD "countryId" integer`);
        await queryRunner.query(`ALTER TABLE "user_address" ADD CONSTRAINT "UQ_c82c2faa0ad2b5a847cc01887e4" UNIQUE ("countryId")`);
    }

}
