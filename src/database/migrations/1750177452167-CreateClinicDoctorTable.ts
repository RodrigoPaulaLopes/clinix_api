import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClinicDoctorTable1750177452167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clinic_users",
        columns: [
          {
            name: "clinic_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
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
            columnNames: ["user_id"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clinic_users");
  }

}
