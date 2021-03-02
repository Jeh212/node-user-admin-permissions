import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('permissions')
export default class Permision {
	@PrimaryGeneratedColumn('uuid') id: string;

	@Column() name: string;

	@Column() description: string;

	@CreateDateColumn() created_at: Date;
}
