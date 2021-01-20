import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnAvatarUrl1611028665858 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'avatar_url',
      type: 'varchar',
      isNullable: true
    }));
    await queryRunner.addColumn('users', new TableColumn({
      name: 'district_id',
      type: 'integer',
      isNullable: true
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar_url');
    await queryRunner.dropColumn('users', 'district_id');
  }

}
