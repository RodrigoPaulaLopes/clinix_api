import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateAuthenticationAttr1750113720945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("user", [
            new TableColumn({
                name: "first_name",
                type: "varchar",
            }),
            new TableColumn({
                name: "last_name",
                type: "varchar",
            }),
            new TableColumn({
                name: "email",
                type: "varchar",
            }),
            new TableColumn({
                name: "password",
                type: "varchar",
            }),
        ]);
    }

}
