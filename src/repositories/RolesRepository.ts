import { EntityRepository, Repository } from 'typeorm';
import Roles from '../models/Roles';

@EntityRepository(Roles)
class RolesRepository extends Repository<Roles> {}

export { RolesRepository };
