import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveUserFirstAndLastNameEmailPassword1749817414234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("user", [
            "first_name",
            "last_name",
            "email",
            "password"
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("user", [
            new TableColumn({
                name: "first_name",
                type: "varchar",
                isNullable: false,
            }),
            new TableColumn({
                name: "last_name",
                type: "varchar",
                isNullable: false,
            }),
            new TableColumn({
                name: "email",
                type: "varchar",
                isUnique: true,
                isNullable: false,
            }),
            new TableColumn({
                name: "password",
                type: "varchar",
                isNullable: false,
            }),
        ]);

    }

}
