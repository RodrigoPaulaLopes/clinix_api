import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCreatedAtAndUpdatedAtColumnInSpeciality1750185316805 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('speciality', [
            new TableColumn({ name: 'created_at', type: 'timestamp' }),
            new TableColumn({ name: 'updated_at', type: 'timestamp' }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('speciality', [
            new TableColumn({
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                }),
            new TableColumn({
                    name: "updated_at",
                    type: "timestamp",      
                }),
        ]);
    }

}
