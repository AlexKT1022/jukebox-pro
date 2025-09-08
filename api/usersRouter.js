import express from 'express';

import { createUser, getUserByCredentials } from '#db/queries/userQueries';
import requireBody from '#middleware/requireBody';
import { createToken } from '#utils/jwt';

const router = express.Router();

router.post(
  '/register',
  requireBody(['username', 'password']),
  async (req, res) => {
    const { username, password } = req.body;
    const newUser = await createUser(username, password);
    const payload = { id: newUser.id };
    const token = createToken(payload);

    return res.status(201).send(token);
  }
);

router.post(
  '/login',
  requireBody(['username', 'password']),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByCredentials(username, password);
    if (!user) return res.status(401).send('Invalid email or password.');

    const payload = { id: user.id };
    const token = createToken(payload);

    return res.send(token);
  }
);

export default router;
