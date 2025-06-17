import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserSpecialitiesPivotTable1750181075772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_specialities",
                columns: [
                    {
                        name: "user_id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "speciality_id",
                        type: "uuid",
                        isPrimary: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "user",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        columnNames: ["speciality_id"],
                        referencedTableName: "speciality",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_specialities");
    }

}
