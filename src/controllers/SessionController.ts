import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRespository } from '../repositories/UserRepository';
import AppError from '../errors/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

class SessionController {
	async create(request: Request, response: Response) {
		const { username, password } = request.body;

		const userRespository = getCustomRepository(UserRespository);

		const user = await userRespository.findOne({ username },{relations:['roles']});

		if (!user) {
			return response.json({ err: 'User not found' });
		}

		const matchPassword = await compare(password, user.password);

		if (!matchPassword) {
			throw new AppError('Wrong password try again!', 400);
		}

    const roles  =  user.roles.map(r=>r.name);

		const token = await sign({roles}, '161a9173072a3eed4b6da9b1ee87d836', {
			subject: user.id,
			expiresIn: '1d'
		});

		return response.json({
			token,
			user
		});
	}
}

export { SessionController };
