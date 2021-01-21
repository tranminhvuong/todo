import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateFriendTable1611195098842 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "friends",
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
          name: "friend_id",
          type: "integer",
          isNullable: false,
        },
        {
          name: "is_online",
          type: "boolean",
          default: false,
          isNullable: false,
        },
      ]
    }), true);
    await queryRunner.createForeignKey('friends', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));
    await queryRunner.createForeignKey('friends', new TableForeignKey({
      columnNames: ['friend_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable("friends");
  }

}
