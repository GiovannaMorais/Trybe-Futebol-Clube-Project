import * as express from 'express';
import RouteLogin from './routes/login.routes';
import RouteTeams from './routes/teams.routes';
import RouterMatches from './routes/matches.routes';
import RouterLeaderboard from './routes/Leaderboard.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.app.use(RouteLogin);
    this.app.use(RouteTeams);
    this.app.use(RouterMatches);
    this.app.use(RouterLeaderboard);
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
