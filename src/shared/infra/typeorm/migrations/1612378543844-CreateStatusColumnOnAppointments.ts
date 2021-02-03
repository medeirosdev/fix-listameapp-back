import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateStatusColumnOnAppointments1612378543844
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'status',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'status');
  }
}
