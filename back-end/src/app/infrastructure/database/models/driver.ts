import mongoose, { Schema, Document } from 'mongoose';

export interface IDriverReview {
  rating: number;
  comment: string;
}

export interface IDriver extends Document {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: IDriverReview;
  value: number;
  min_distance: number;
}

const DriverReviewSchema: Schema = new Schema({
  rating: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String, required: false },
});

const DriverSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  vehicle: { type: String, required: true },
  review: { type: DriverReviewSchema, required: true },
  value: { type: Number, required: true },
  min_distance: { type: Number, required: true },
});

export default mongoose.model<IDriver>('Driver', DriverSchema);
