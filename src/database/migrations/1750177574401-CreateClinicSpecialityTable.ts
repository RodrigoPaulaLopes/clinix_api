import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClinicSpecialityTable1750177574401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "clinic_specialities",
                columns: [
                    {
                        name: "clinic_id",
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
                        columnNames: ["clinic_id"],
                        referencedTableName: "clinic",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["speciality_id"],
                        referencedTableName: "speciality",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clinic_specialities");
    }

}
