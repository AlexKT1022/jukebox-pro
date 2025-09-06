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
  const { rows } = await db.query(sql, [username, password]);

  return rows[0];
};
