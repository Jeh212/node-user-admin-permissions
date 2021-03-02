import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import { PermissionRepository } from '../repositories/PermissionRepository';

class PermissionController {
	async create(request: Request, response: Response) {
		const permissionRepository = getCustomRepository(PermissionRepository);

		const { name, description } = request.body;

		const existPermission = await permissionRepository.findOne({ name });

		if (existPermission) {
			return response.status(400).json({ err: 'Permission already exists!' });
		}

		try {
			const permission = await permissionRepository.create({
				name,
				description
			});
			console.log(permission);
			await permissionRepository.save(permission);
			return response.json(permission);
		} catch (error) {
			throw new AppError(error, 400);
		}
	}
}

export { PermissionController };
