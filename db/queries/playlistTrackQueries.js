import db from '#db/client';

export const createPlaylistTrackAssociation = async (playlistId, trackId) => {
  const sql = `
    INSERT INTO
      playlist_tracks (playlist_id, track_id)
    VALUES
      ($1, $2)
    RETURNING
      *
  `;
  const { rows } = await db.query(sql, [playlistId, trackId]);

  return rows[0];
};
