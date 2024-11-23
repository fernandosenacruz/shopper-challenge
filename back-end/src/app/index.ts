import cors from 'cors';
import Express, { Application } from 'express';

import { ride } from './routes';

const App: Application = Express();

App.use(Express.json(), cors());

App.use('/', ride);

export default App;
