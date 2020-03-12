import { celebrate, Joi } from 'celebrate';

const options = {
  allowUnknown: true,
  abortEarly: false,
};

const categoryVal = (mode: string) =>
  celebrate(
    {
      body: Joi.object().keys({
        title: Joi.string().min(1).label('title')
          .when(mode, { is: 'required', then: Joi.required(), otherwise: Joi.optional() }),
        population: Joi.number().positive().min(0).allow(null, 0).label('population'),
        bio: Joi.string().allow(null, '').label('bio')
      }),
    },
    options
  );

export default {
  createCategoryVal: categoryVal('required'),
  editCategoryVal: categoryVal('optional'),
};
