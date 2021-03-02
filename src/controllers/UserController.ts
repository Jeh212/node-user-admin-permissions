import { Request, Response } from 'express';
import { getCustomRepository, SimpleConsoleLogger } from 'typeorm';
import { UserRespository } from '../repositories/UserRepository';
import { hash } from 'bcrypt';
import { RolesRepository } from '../repositories/RolesRepository';

interface IRequest {
	name: string;
	username: string;
	password: string;
	roles: Object[];
}

class UserController {
	async create(request: Request, response: Response) {
		const { name, username, password, roles }: IRequest = request.body;

		const userRepository = getCustomRepository(UserRespository);
		const roleRepository = getCustomRepository(RolesRepository);

		const alreadyExistUser = await userRepository.findOne({ username });

		if (alreadyExistUser) {
			return response.status(400).json({ err: 'User Already exist' });
		}
		const passHashed = await hash(password, 8);

		const existRoles = await roleRepository.findByIds(roles);

		const user = userRepository.create({
			name,
			username,
			password: passHashed,
			roles: existRoles
		});

		await userRepository.save(user);

		return response.status(200).json(user);
	}
}

export { UserController };
