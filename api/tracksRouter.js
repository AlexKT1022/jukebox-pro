import express from 'express';

import { getPlaylistsByTrackId } from '#db/queries/playlistQueries';
import { getTrackById } from '#db/queries/trackQueries';
import requireUser from '#middleware/requireUser';

const router = express.Router();

router.use(requireUser);

router.param('id', async (req, res, next, id) => {
  const track = await getTrackById(id);
  if (!track) return res.status(404).send('Track not found.');

  req.track = track;

  next();
});

router.get('/:id/playlists', async (req, res) => {
  const track = await getTrackById(req.params.id);

  console.log(req.user);
  if (!track) return res.status(404).send('Track not found.');

  console.log(track);

  const playlists = await getPlaylistsByTrackId(track.id, req.user.id);

  console.log(playlists);

  return res.send(playlists);
});

export default router;
