import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClinicTable1750173343010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clinic",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "cnpj",
            type: "varchar",
            length: "18",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "phone",
            type: "varchar",
            length: "15",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "street",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "neighborhood",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
          {
            name: "state",
            type: "varchar",
            length: "2",
            isNullable: true,
          },
          {
            name: "zip_code",
            type: "varchar",
            length: "8",
            isNullable: true,
          },
          {
            name: "country",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "complement",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "opening_hours",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
          {
            name: "days_open",
            type: "text",
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
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
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clinic");
  }

}
