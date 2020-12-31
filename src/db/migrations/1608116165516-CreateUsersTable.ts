import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1608116165516 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "integer",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: "user_name",
          type: "varchar",
          isNullable: true,
        },
        {
          name: "email",
          type: "varchar",
          isNullable: true,
        },
        {
          name: "password_digest",
          type: "varchar",
          isNullable: false
        },
        {
          name: "confirm_code",
          type: "text",
          isNullable: true
        },
        {
          name: "phone_number",
          type: "text",
          isNullable: true
        },
        {
          name: "full_name",
          type: "varchar",
          isNullable: false
        },
        {
          name: "access_token",
          type: "varchar",
          isNullable: true
        },
        {
          name: "active_token",
          type: "varchar",
          isNullable: true
        },
        {
          name: "birth_day",
          type: "date",
          isNullable: true
        },
        {
          name: "gender",
          type: "boolean",
          default: true
        },
        {
          name: "is_active",
          type: "boolean",
          default: false
        },
        {
          name: "is_private",
          type: "boolean",
          default: false
        },
        {
          name: "reset_token",
          type: "varchar",
          isNullable: true
        },
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable("users");
  }

}
