import { Router } from 'express';

import UsersController from './app/controllers/UsersController';
import SessionsController from './app/controllers/SessionsController';

const routes = new Router();

routes.post('/users', UsersController.create);
routes.post('/session', SessionsController.create);

export default routes;
