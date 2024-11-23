import './config';
import App from './app';
import { connectToDatabase } from './app/infrastructure/database/connection';

process.on('SIGTERM', () => process.exit());
const PORT = process.env.PORT ?? 8080;

connectToDatabase(process.env.MONGO_URL);

App.listen(PORT, () => console.log('App listening at %d', PORT));
