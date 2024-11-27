import cors from 'cors';
import Express, { Application } from 'express';

import { ride, user, driver } from './routes';

const App: Application = Express();

App.use(Express.json(), cors());

App.use('/', ride, user, driver);

export default App;
