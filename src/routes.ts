import { Router } from 'express';
import { PermissionController } from './controllers/PermissionController';
import { RolesController } from './controllers/RolesController';
import { SessionController } from './controllers/SessionController';
import { UserController } from './controllers/UserController';

const routes = Router();

const userController = new UserController();
const sessionController = new SessionController();
const permissionController = new PermissionController();
const rolesController = new RolesController();

routes.post('/users', userController.create);
routes.post('/sessions', sessionController.create);
routes.post('/permissions', permissionController.create);
routes.post('/roles', rolesController.create);

export { routes };
