import db from '#db/client';

export const getPlaylists = async () => {
  const sql = `
    SELECT
      *
    FROM
      playlists
  `;
  const { rows } = await db.query(sql);

  return rows;
};

export const getPlaylistById = async (id) => {
  const sql = `
    SELECT
      *
    FROM
      playlists
    WHERE
      id = $1
  `;
  const { rows } = await db.query(sql, [id]);

  return rows[0];
};

export const getRandomPlaylist = async () => {
  const sql = `
    SELECT
      *
    FROM
      playlists
    ORDER BY
      RANDOM()
    LIMIT
      1
  `;
  const { rows } = await db.query(sql);

  return rows[0];
};

export const createPlaylist = async (name, description, ownerId) => {
  const sql = `
    INSERT INTO
      playlists (name, description, owner_id)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
  `;
  const { rows } = await db.query(sql, [name, description, ownerId]);

  return rows[0];
};
