import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveAuthIdAttr1750114541151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "auth0Id");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("user", new TableColumn({
            name: "auth0Id",
            type: "varchar",
            isUnique: true,
            isNullable: false,
        }));
    }

}
