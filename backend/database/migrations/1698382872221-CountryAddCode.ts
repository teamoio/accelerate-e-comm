import { MigrationInterface, QueryRunner } from "typeorm";

export class CountryAddCode1698382872221 implements MigrationInterface {
    name = 'CountryAddCode1698382872221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" ADD "code" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "code"`);
    }

}
