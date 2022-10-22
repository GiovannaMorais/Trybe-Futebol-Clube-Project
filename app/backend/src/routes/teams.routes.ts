import { Router } from 'express';
import TeamsController from '../controller/TeamsController';

const teamsController = new TeamsController();
const router = Router();

router.get('/teams', teamsController.getAllTeams);
router.get('/teams/:id', teamsController.getTeamsByTeamId);

export default router;
