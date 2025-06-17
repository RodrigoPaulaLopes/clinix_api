import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateNewCreatedAtAndUpdatedAtColumnInSpeciality1750185538791 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('speciality', [
            new TableColumn({
                name: "created_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP",
            }),
            new TableColumn({
                name: "updated_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP",
                onUpdate: "CURRENT_TIMESTAMP",
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('speciality', 'created_at')
        await queryRunner.dropColumn('speciality', 'updated_at')
    }

}
