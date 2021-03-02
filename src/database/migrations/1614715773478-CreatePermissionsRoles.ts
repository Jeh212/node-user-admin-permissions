import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { QueryExpressionMap } from 'typeorm/query-builder/QueryExpressionMap';

export class CreatePermissionsRoles1614715773478 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'permission_roles',
				columns: [ { name: 'role_id', type: 'uuid' }, { name: 'permission_id', type: 'uuid' } ]
			})
		);

		await queryRunner.createForeignKey(
			'permission_roles',
			new TableForeignKey({
				columnNames: [ 'permission_id' ],
				referencedColumnNames: [ 'id' ],
				referencedTableName: 'permissions',
				name: 'fk_permissions_roles_',
				onDelete: 'CASCADE',
				onUpdate: 'SET NULL'
			})
		);

		await queryRunner.createForeignKey(
			'permission_roles',
			new TableForeignKey({
				columnNames: [ 'role_id' ],
				referencedColumnNames: [ 'id' ],
				referencedTableName: 'roles',
				name: 'fk_roles_permissions_',
				onDelete: 'CASCADE',
				onUpdate: 'SET NULL'
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('permission_roles', 'fk_roles_permissions_');
		await queryRunner.dropForeignKey('permission_roles', 'fk_permissions_roles_');
		await queryRunner.dropTable('permission_roles');
	}
}
