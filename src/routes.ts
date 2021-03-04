import { Router } from 'express';
import { PermissionController } from './controllers/PermissionController';
import { RolesController } from './controllers/RolesController';
import { SessionController } from './controllers/SessionController';
import { UserController } from './controllers/UserController';
import { ProductsController } from './controllers/ProductsController';

import {is} from './middlewares/permission'

const routes = Router();


/* Instancia das Controllers */
const userController = new UserController();
const sessionController = new SessionController();
const permissionController = new PermissionController();
const rolesController = new RolesController();
const productsController =  new ProductsController();

routes.post('/users', userController.create);
routes.post('/sessions', sessionController.create);
routes.post('/permissions', permissionController.create);
routes.post('/roles', rolesController.create);

routes.post('/products', is(['ROLE_ADMIN']), productsController.create)
routes.get('/products', is(['ROLE_ADMIN','ROLE_USER']),productsController.index)
routes.get('/products/:id', is(['ROLE_ADMIN','ROLE_USER']), productsController.show)


export { routes };
