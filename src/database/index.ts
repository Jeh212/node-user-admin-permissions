import { create } from 'domain';
import { createConnection } from 'typeorm';

try {
	createConnection();
	console.log('Banco de dados Rodando');
} catch (error) {
	throw new Error(error);
}

export default createConnection;
