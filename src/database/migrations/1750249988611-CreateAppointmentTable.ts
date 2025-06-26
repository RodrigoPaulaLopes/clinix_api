import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAppointmentTable1750249988611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointment",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "patient_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "doctor_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "clinic_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "date",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "time",
                        type: "time",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["scheduled", "confirmed", "cancelled", "completed", "in_progress"],
                        default: "'scheduled'",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );

        await queryRunner.createForeignKeys("appointment", [
            new TableForeignKey({
                columnNames: ["patient_id"],
                referencedTableName: "user",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
            new TableForeignKey({
                columnNames: ["doctor_id"],
                referencedTableName: "user",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
            new TableForeignKey({
                columnNames: ["clinic_id"],
                referencedTableName: "clinic",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointment");
    }

}
