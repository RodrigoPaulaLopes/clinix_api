import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveAddressColumnsInUserTable1750169767691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn("user", "address");
        await queryRunner.dropColumn("user", "city");
        await queryRunner.dropColumn("user", "state");
        await queryRunner.dropColumn("user", "zip_code");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn("user", new TableColumn({
            name: "address",
            type: "varchar",
            isNullable: true,
            length: "255",
        }));
        await queryRunner.addColumn("user", new TableColumn({
            name: "city",
            type: "varchar",
            isNullable: true,
            length: "100",
        }));
        await queryRunner.addColumn("user", new TableColumn({
            name: "state",
            type: "varchar",
            isNullable: true,
            length: "50",
        }));
        await queryRunner.addColumn("user", new TableColumn({
            name: "zip_code",
            type: "varchar",
            isNullable: true,
            length: "10",
        }));
    }

}
