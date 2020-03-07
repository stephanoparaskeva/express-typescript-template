import { Route } from '../../meta/types/common-type';

const indexCategories: Route = {
  method: 'get',
  endpoint: '/categories',

  controller: async (req, res, _next) => {
    const { body } = req;

    try {
      res.status(500).json(body);
    } catch (e) {
      console.log(e, 'test');
    }
  },
};

export default {
  indexCategories,
};
