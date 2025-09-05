DROP TABLE IF EXISTS playlist_tracks;

DROP TABLE IF EXISTS playlists;

DROP TABLE IF EXISTS tracks;

CREATE TABLE tracks (
  id serial PRIMARY KEY,
  name TEXT NOT NULL,
  duration_ms INTEGER NOT NULL
);

CREATE TABLE playlists (
  id serial PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE playlist_tracks (
  id serial PRIMARY KEY,
  playlist_id INTEGER NOT NULL REFERENCES playlists (id) ON DELETE CASCADE,
  track_id INTEGER NOT NULL REFERENCES tracks (id) ON DELETE CASCADE,
  UNIQUE (playlist_id, track_id)
);
