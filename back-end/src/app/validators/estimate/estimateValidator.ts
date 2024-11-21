import { bodyRequiredValidator, diffAddressValidator } from '../validatorUtil';

export const getEstimateSchema = [
  bodyRequiredValidator('customer_id'),
  bodyRequiredValidator('origin'),
  bodyRequiredValidator('destination'),
  diffAddressValidator('origin', 'destination'),
];
