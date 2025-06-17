import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserRoleColumn1750119791862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn("user", new TableColumn({
            name: "role",
            type: "enum",
            enum: ["admin", "patient", "doctor"],
            default: "'patient'",
            isNullable: false,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "role");
    }

}
