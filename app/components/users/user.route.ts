import { getRepository } from 'typeorm';
import { Route } from '../../meta/types/common-types';
import { HTTP500Error } from '../../lib/errors/http-errs';
import { User } from './user.entity';

export const createUserRoute: Route = {
  method: 'post',
  endpoint: '/users',

  middleware: async (req, res) => {
    const { email, password } = req.body;

    try {
      const userRepo = getRepository(User);
      const person1 = { email, password };

      const x = await userRepo.save(person1);

      res.status(200).json(x);
    } catch (err) {
      console.log(err);
      throw new HTTP500Error(err.message);
    }
  },
};
