import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('products')
export default class Products {
	@PrimaryGeneratedColumn('uuid') id: string;

	@Column() name: string;

	@Column() description: string;

	@CreateDateColumn() created_at: Date;
}
