import { body } from 'express-validator';

export const bodyRequiredValidator = (field: string) => {
  return body(field)
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(`${field} é obrigatório`)
    .isString()
    .withMessage(`${field} deve ser uma string`);
};

export const diffAddressValidator = (field1: string, field2: string) => {
  return body(field1).custom((value, { req }) => {
    if (value === req.body[field2]) {
      throw new Error(`${field1} e ${field2} não podem ser iguais`);
    }
    return true;
  });
};
