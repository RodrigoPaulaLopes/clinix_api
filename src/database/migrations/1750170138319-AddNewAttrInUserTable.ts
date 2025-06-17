import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNewAttrInUserTable1750170138319 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("user", [
            new TableColumn({
                name: "street",
                type: "varchar",
                length: "255",
                isNullable: true,
            }),
            new TableColumn({
                name: "neighborhood",
                type: "varchar",
                length: "100",
                isNullable: true,
            }),
            new TableColumn({
                name: "city",
                type: "varchar",
                length: "100",
                isNullable: true,
            }),
            new TableColumn({
                name: "state",
                type: "varchar",
                length: "50",
                isNullable: true,
            }),
            new TableColumn({
                name: "zip_code",
                type: "varchar",
                length: "10",
                isNullable: true,
            }),
            new TableColumn({
                name: "country",
                type: "varchar",
                length: "100",
                isNullable: true,
            }),
            new TableColumn({
                name: "complement",
                type: "varchar",
                length: "255",
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("user", [
            "address_street",
            "address_neighborhood",
            "address_city",
            "address_state",
            "address_zip_code",
            "address_country",
            "address_complement",
        ]);
    }

}
