import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAuth0IdInUserTables1749817141051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("user", new TableColumn({
            name: "auth0Id",
            type: "varchar",
            isNullable: false,
            isUnique: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn("user", "auth0Id");
    }

}
