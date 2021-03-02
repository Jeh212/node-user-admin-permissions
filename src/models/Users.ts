import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import Roles from './Roles';
@Entity('users')
class User {
	@PrimaryGeneratedColumn() id: string;

	@Column() name: string;

	@Column() username: string;

	@Column() password: string;

	@CreateDateColumn() created_at: Date;

	@ManyToMany(() => Roles)
	@JoinTable({
		name: 'user_roles',
		joinColumns: [ { name: 'user_id' } ],
		inverseJoinColumns: [ { name: 'role_id' } ]
	})
	roles: Roles[];
}

export default User;
