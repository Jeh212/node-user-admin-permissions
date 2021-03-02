import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import Permission from './Permission';

@Entity('roles')
export default class Roles {
	@PrimaryGeneratedColumn('uuid') id: string;

	@Column() name: string;

	@Column() description: string;

	@CreateDateColumn() created_at: Date;

	@ManyToMany(() => Permission)
	@JoinTable({
		name: 'permission_roles',
		joinColumns: [ { name: 'role_id' } ],
		inverseJoinColumns: [ { name: 'permission_id' } ]
	})
	permission: Permission[];
}
