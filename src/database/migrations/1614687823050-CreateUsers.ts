import { IsNull, MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1614687823050 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()'
					},
					{
						name: 'name',
						type: 'varchar'
					},
					{
						name: 'username',
						type: 'varchar'
					},
					{
						name: 'password',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
