import { Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matchesController = new MatchesController();
const router = Router();

router.get('/matches', matchesController.getMatches);

export default router;
