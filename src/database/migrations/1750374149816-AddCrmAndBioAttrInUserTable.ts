import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCrmAndBioAttrInUserTable1750374149816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns('user', [
            new TableColumn({
                name: "crm",
                type: 'varchar',
                isUnique: true,
                isNullable: true
            }),
            new TableColumn({
                name: "bio",
                type: 'varchar',
                isNullable: true
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn('user', 'crm')
        await queryRunner.dropColumn('user', 'bio')
    }

}
