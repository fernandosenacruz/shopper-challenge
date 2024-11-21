import './config';
import App from './app';

process.on('SIGTERM', () => process.exit());
const PORT = process.env.PORT ?? 8080;

App.listen(PORT, () => console.log('App listening at %d', PORT));
