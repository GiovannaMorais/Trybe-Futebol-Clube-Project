import { Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/leaderboard/home', leaderboardController.getLeaderboardResultsHome);
router.get('/leaderboard/away', leaderboardController.getLeaderboardResultsAway);
router.get('/leaderboard', leaderboardController.getLeaderboardResults);

export default router;
