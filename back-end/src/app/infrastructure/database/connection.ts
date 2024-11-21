import mongoose from 'mongoose';
import user from './models/user';
import driver from './models/driver';
import ride from './models/ride';

export const connectToDatabase = async (db_url: string | undefined) => {
  if (!db_url) throw new Error('envirionment variable DB_URL not set');

  return mongoose
    .connect(db_url)
    .then(() => {
      console.log('Connected to database');
      user.syncIndexes();
      driver.syncIndexes();
      ride.syncIndexes();
    })
    .catch((err) => console.error('Connection error:', err));
};
