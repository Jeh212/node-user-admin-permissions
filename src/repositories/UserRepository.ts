import { EntityRepository, Repository } from 'typeorm';
import User from '../models/Users';

@EntityRepository(User)
class UserRespository extends Repository<User> {}

export { UserRespository };
