import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserColumns1698228925192 implements MigrationInterface {
    name = 'UpdateUserColumns1698228925192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_admin" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_admin"`);
    }

}
