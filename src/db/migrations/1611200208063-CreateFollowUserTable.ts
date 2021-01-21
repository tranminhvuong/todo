import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateFollowUserTable1611200208063 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "follows",
      columns: [
        {
          name: "id",
          type: "integer",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: "user_id",
          type: "integer",
          isNullable: false,
        },
        {
          name: "following_id",
          type: "integer",
          isNullable: false,
        },
      ]
    }), true);
    await queryRunner.createForeignKey('follows', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));
    await queryRunner.createForeignKey('follows', new TableForeignKey({
      columnNames: ['following_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable("follows");
  }

}
