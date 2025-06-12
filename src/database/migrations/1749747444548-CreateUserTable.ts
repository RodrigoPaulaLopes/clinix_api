import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1749747444548 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "gen_random_uuid()",
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "date_of_birth",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true,
                        length: "15",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: true,
                        length: "15",
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: true,
                        length: "255",
                    },
                    {
                        name: "city",
                        type: "varchar",
                        isNullable: true,
                        length: "100",
                    },
                    {
                        name: "state",
                        type: "varchar",
                        isNullable: true,
                        length: "50",
                    },
                    {
                        name: "zip_code",
                        type: "varchar",
                        isNullable: true,
                        length: "10",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user", true, true, true);
    }

}
