import express from 'express';

import {
  createPlaylist,
  getPlaylistById,
  getPlaylistsByUserId,
} from '#db/queries/playlistQueries';
import { getTracksByPlaylistId } from '#db/queries/trackQueries';
import requireBody from '#middleware/requireBody';
import requireUser from '#middleware/requireUser';

const router = express.Router();

router.use(requireUser);

router.get('/', async (req, res) => {
  const playlists = await getPlaylistsByUserId(req.user.id);

  return res.send(playlists);
});

router.post('/', requireBody(['name', 'description']), async (req, res) => {
  const { name, description } = req.body;
  const newPlaylist = await createPlaylist(name, description, req.user.id);

  return res.status(201).send(newPlaylist);
});

router.param('id', async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send('Playlist not found.');

  req.playlist = playlist;

  next();
});

router.get('/:id', (req, res) => {
  if (req.user.id !== req.playlist.ownerId)
    return res.status(403).send('Unauthorized.');

  return res.send(req.playlist);
});

router.get('/:id/tracks', async (req, res) => {
  if (req.user.id !== req.playlist.ownerId)
    return res.status(403).send('Unauthorized.');

  const tracks = await getTracksByPlaylistId(req.playlist.id);

  return res.send(tracks);
});

router.post('/:id/tracks', async (req, res) => {
  if (req.user.id !== req.playlist.owner_id)
    return res.status(403).send('Unauthorized.');

  return res.sendStatus(201);
});

export default router;
