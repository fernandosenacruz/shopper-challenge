import mongoose, { Schema, Document } from 'mongoose';

export interface IRideDriver {
  id: number;
  name: string;
}

export interface IRide extends Document {
  id: number;
  customer_id: {
    type: string;
    required: true;
    unique: true;
    index: true;
    ref: 'User';
  };
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: IRideDriver;
  value: number;
}

const RideSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  customer_id: { type: String, required: true, index: true },
  date: { type: Date, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: String, required: true },
  driver: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  value: { type: Number, required: true },
});

export default mongoose.model<IRide>('Ride', RideSchema);
