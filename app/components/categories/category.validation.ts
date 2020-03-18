import { celebrate, Joi } from 'celebrate';

const options: object = { allowUnknown: true, abortEarly: false };

export const createCategoryVal = celebrate(
  {
    body: Joi.object().keys({
      title: Joi.string()
        .min(1)
        .label('title')
        .required(),
      description: Joi.string()
        .allow(null, '')
        .label('description'),
    }),
  },
  options
);

export const editCategoryVal = celebrate(
  {
    body: Joi.object().keys({
      title: Joi.string()
        .min(1)
        .label('title')
        .optional(),
      description: Joi.string()
        .allow(null, '')
        .label('description'),
    }),
  },
  options
);
