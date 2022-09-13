import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionControler from './controllers/SessionController';
import HouseController from './controllers/HouseController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionControler.store);

routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);

export default routes;
