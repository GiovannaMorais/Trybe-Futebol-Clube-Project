import { Router } from 'express';
import MatchesController from '../controller/MatchesController';
import auth from '../middlewares/auth';

const matchesController = new MatchesController();
const router = Router();

router.get('/matches', matchesController.getMatches);
router.post('/matches', auth, matchesController.saveMatchesInProgress);
router.patch('/matches/:id/finish', matchesController.changeMatchesInProgress);

export default router;
