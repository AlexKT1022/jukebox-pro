import db from '#db/client';

export const getPlaylistsByUserId = async (userId) => {
  const sql = `
    SELECT
      *
    FROM
      playlists
    WHERE
      owner_id = $1
  `;
  const { rows } = await db.query(sql, [userId]);

  return rows;
};

export const getPlaylistsByTrackId = async (trackId) => {
  const sql = `
    SELECT
      playlists.*
    FROM
      playlist_tracks
      JOIN playlists ON playlists.id = playlist_tracks.playlist_id
      JOIN tracks ON tracks.id = playlist_tracks.track_id
    WHERE
      playlist_tracks.track_id = $1;
  `;
  const { rows } = await db.query(sql, [trackId]);

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
