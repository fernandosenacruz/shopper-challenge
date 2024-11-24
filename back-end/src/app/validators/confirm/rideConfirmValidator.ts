import { getEstimateSchema } from '../estimate/estimateValidator';
import {
  bodyStringRequiredValidator,
  bodyNumberRequiredValidator,
} from '../validatorUtil';

export const patchRideConfirmSchema = [...getEstimateSchema];

patchRideConfirmSchema.push(
  bodyNumberRequiredValidator('distance'),
  bodyStringRequiredValidator('duration'),
  bodyNumberRequiredValidator('value'),
  bodyNumberRequiredValidator('driver.id'),
  bodyStringRequiredValidator('driver.name')
);
