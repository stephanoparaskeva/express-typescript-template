import { getRepository } from 'typeorm';
import { Middleware } from '../../meta/types/common-types';
import User from './user.entity';

export const createUserController: Middleware = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRepo = getRepository(User);
    const person1 = { email, password };

    const x = await userRepo.save(person1);
    console.log(x);

    res.status(200).json(person1);
  } catch (err) {
    console.log(err);

    throw new Error(err);
  }
};
