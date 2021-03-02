export default class AppError extends Error {
	readonly message;
	readonly satusCode;
	constructor(message: string, statusCode: number) {
		super(`AppError`);
		this.message = message;
		this.satusCode = statusCode;
	}
}
