import { Request, response, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import { ProductRepository } from '../repositories/ProductRepository';

class ProductsController {
	async create(request: Request, response: Response) {
		const productRepository = getCustomRepository(ProductRepository);

		const { name, description } = request.body;

		const existProduct = await productRepository.findOne({ name });

		if (existProduct) {
			return response.status(400).json({ err: 'Product already exists!' });
		}

		try {
			const permission = await productRepository.create({
				name,
				description
			});
			console.log(permission);
			await productRepository.save(permission);
			return response.json(permission);
		} catch (error) {
			throw new AppError(error, 400);
		}
	}

	async index(request: Request, response: Response) {
		const productsRepository = getCustomRepository(ProductRepository);

		const product = await productsRepository.find();

		return response.json(product);
	}

	async show(request: Request, response: Response) {
		const productsRepository = getCustomRepository(ProductRepository);

		const { id } = request.params;

		const product = await productsRepository.findOne(id);

		return response.status(200).json(product);
	}
}

export { ProductsController };
