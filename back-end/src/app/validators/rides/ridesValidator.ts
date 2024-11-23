import { queryStringRequiredValidator } from '../validatorUtil';

export const getRidesSchema = [queryStringRequiredValidator('customer_id')];
