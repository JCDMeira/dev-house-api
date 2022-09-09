import { Router } from 'express';

import SessionControler from './controllers/SessionController';

const routes = new Router();

routes.post('/sessions', SessionControler.store);

export default routes;
