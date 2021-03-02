import { Request, Response } from 'express';
import { createConnection, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import { PermissionRepository } from '../repositories/PermissionRepository';
import { RolesRepository } from '../repositories/RolesRepository';

class RolesController {
	async create(request: Request, response: Response) {
		const roleRepository = getCustomRepository(RolesRepository);
		const permissionRepository = getCustomRepository(PermissionRepository);

		const { name, description, permissions } = request.body;

		const existRole = await roleRepository.findOne({ name });

		if (existRole) {
			return response.status(400).json({ err: 'Role already exists!' });
		}
		const existsPermissions = await permissionRepository.findByIds(permissions);

		try {
			const role = await roleRepository.create({
				name,
				description,
				permission: existsPermissions
			});
			console.log(role);
			await roleRepository.save(role);
			return response.json(role);
		} catch (error) {
			console.log(error);
		}
	}
}

export { RolesController };
