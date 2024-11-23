import {
  bodyStringRequiredValidator,
  diffAddressValidator,
} from '../validatorUtil';

export const getEstimateSchema = [
  bodyStringRequiredValidator('customer_id'),
  bodyStringRequiredValidator('origin'),
  bodyStringRequiredValidator('destination'),
  diffAddressValidator('origin', 'destination'),
];
