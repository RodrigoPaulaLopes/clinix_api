import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserIdFromSpeciality1750181017149 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("speciality");

        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.includes("userId"));
        if (foreignKey) {
            await queryRunner.dropForeignKey("speciality", foreignKey);
        }

        const hasColumn = table.columns.find(c => c.name === "userId");
        if (hasColumn) {
            await queryRunner.dropColumn("speciality", "userId");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "speciality" ADD "userId" uuid`);
        await queryRunner.query(`
            ALTER TABLE "speciality"
            ADD CONSTRAINT "FK_speciality_user"
            FOREIGN KEY ("userId") REFERENCES "user"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `);
    }

}
