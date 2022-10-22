import { Router } from 'express';
import LoginController from '../controller/LoginController';
import LoginMiddleware from '../middlewares/LoginMiddleware';

const loginController = new LoginController();
const router = Router();

router.post('/login', LoginMiddleware, loginController.login);
router.get('/login/validate', loginController.validate);

export default router;
