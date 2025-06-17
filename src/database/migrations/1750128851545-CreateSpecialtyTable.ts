import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpecialtyTable1750128851545 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "specialty",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "gen_random_uuid()",
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                    length: "100",
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: true,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updated_at",
                    type: "timestamp",      
                }
            ],}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("specialty");
    }

}
