import mongoose, { Schema, Document } from 'mongoose';

export interface IRideDriver {
  id: number;
  name: string;
}

export interface IRide extends Document {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: IRideDriver;
  value: number;
}

const RideSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true, index: true },
  date: { type: Date, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: String, required: true },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  value: { type: Number, required: true },
});

export default mongoose.model<IRide>('Ride', RideSchema);
