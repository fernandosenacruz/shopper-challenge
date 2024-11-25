interface IReview {
  rating: number;
  comment: string;
}

export interface IDriver {
  id: number;
  name: string;
  description: string;
  review: IReview;
  value: number;
  vehicle: string;
}

export interface IDrivers {
  drivers: IDriver[];
}
