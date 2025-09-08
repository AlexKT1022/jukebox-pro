import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

/** Creates a token with the given payload */
export const createToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
};

/** Extracts the payload from a token */
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
