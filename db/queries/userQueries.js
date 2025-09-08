import bcrypt from 'bcrypt';

import db from '#db/client';

export const getUsers = async () => {
  const sql = `
    SELECT
      *
    FROM
      users
  `;
  const { rows } = await db.query(sql);

  return rows;
};

export const getUserById = async (userId) => {
  const sql = `
    SELECT
      *
    FROM
      users
    WHERE
      id = $1
  `;
  const { rows } = await db.query(sql, [userId]);

  return rows[0];
};

export const getUserByCredentials = async (username, password) => {
  const sql = `
    SELECT
      *
    FROM
      users
    WHERE
      username = $1
  `;
  const { rows } = await db.query(sql, [username]);
  const user = rows[0];
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
};

export const getRandomUser = async () => {
  const sql = `
    SELECT
      *
    FROM
      users
    ORDER BY
      RANDOM()
    LIMIT
      1
  `;
  const { rows } = await db.query(sql);

  return rows[0];
};

export const createUser = async (username, password) => {
  const sql = `
    INSERT INTO
      users (username, password)
    VALUES
      ($1, $2)
    RETURNING
      *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await db.query(sql, [username, hashedPassword]);

  return rows[0];
};
