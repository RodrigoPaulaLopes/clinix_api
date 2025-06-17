import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDoctorAvailabilityTable1750131729639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "doctor_availability",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "userId",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "dayOfWeek",
                        type: "enum",
                        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
                        isNullable: false,
                    },
                    {
                        name: "startTime",
                        type: "time",
                        isNullable: false,
                    },
                    {
                        name: "endTime",
                        type: "time",
                        isNullable: false,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            "doctor_availability",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("doctor_availability");
    }

}
