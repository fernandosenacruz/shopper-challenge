import { queryStringRequiredValidator } from '../validatorUtil';

export const getUserSchema = [queryStringRequiredValidator('id')];
