import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateUserRoleColumn1750128642957 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "role");

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
        await queryRunner.addColumn("user", new TableColumn({
            name: "role",
            type: "enum",
            enum: ["admin", "user"],
            default: "'user'",
            isNullable: false,
        }));
    }

}
