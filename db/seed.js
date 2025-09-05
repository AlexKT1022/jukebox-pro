import { faker } from '@faker-js/faker';

import db from '#db/client';
import { createPlaylist, getRandomPlaylist } from '#db/queries/playlistQueries';
import { createPlaylistTrackAssociation } from '#db/queries/playlistTrackQueries';
import { createTrack, getRandomTrack } from '#db/queries/trackQueries';

const generatePlaylists = async (numPlaylists) => {
  for (let i = 0; i < numPlaylists; i++) {
    const playlistName = faker.commerce.productName();
    const playlistDescription = faker.commerce.productDescription();

    await createPlaylist(playlistName, playlistDescription);
  }
};

const generateTracks = async (numTracks) => {
  for (let i = 0; i < numTracks; i++) {
    const trackName = faker.word.words({ min: 1, max: 5 });
    const trackDuration = faker.number.int({ min: 60000, max: 600000 });

    await createTrack(trackName, trackDuration);
  }
};

const generatePlaylistTrackAssociations = async (numAssociations) => {
  let rows = 0;

  while (rows < numAssociations) {
    try {
      const playlist = await getRandomPlaylist();
      const track = await getRandomTrack();

      await createPlaylistTrackAssociation(playlist.id, track.id);

      rows++;
    } catch (err) {
      continue;
    }
  }
};

const seed = async () => {
  await generatePlaylists(20);
  await generateTracks(20);
  await generatePlaylistTrackAssociations(15);
};

await db.connect();
await seed();
await db.end();

console.log('🌱 Database seeded.');
