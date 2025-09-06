import { faker } from '@faker-js/faker';

import db from '#db/client';
import { createPlaylist, getRandomPlaylist } from '#db/queries/playlistQueries';
import { createPlaylistTrackAssociation } from '#db/queries/playlistTrackQueries';
import { createTrack, getRandomTrack } from '#db/queries/trackQueries';
import { createUser, getRandomUser, getUsers } from '#db/queries/userQueries';

const generateUsers = async (numUsers = 2) => {
  let usersToAdd = Math.max(numUsers, 2);

  while (usersToAdd > 0) {
    try {
      const username = faker.internet.username().toLowerCase();
      const password = `${faker.word.words({ count: { min: 1, max: 2 } }).replaceAll(' ', '')}${faker.string.numeric({ length: { min: 0, max: 3 } })}`;

      await createUser(username, password);

      usersToAdd--;
    } catch (err) {
      continue;
    }
  }
};

const generatePlaylists = async (numPlaylists = 10) => {
  const users = await getUsers();
  let playlistsToAdd = Math.max(numPlaylists, 10);

  for (const user of users) {
    for (let i = 0; i < 5; i++) {
      const playlistName = faker.commerce.productName();
      const playlistDescription = faker.commerce.productDescription();
      const ownerId = user.id;

      await createPlaylist(playlistName, playlistDescription, ownerId);

      playlistsToAdd--;
    }
  }

  while (playlistsToAdd > 0) {
    const playlistName = faker.commerce.productName();
    const playlistDescription = faker.commerce.productDescription();
    const playlistOwner = await getRandomUser();

    await createPlaylist(playlistName, playlistDescription, playlistOwner.id);

    playlistsToAdd--;
  }
};

const generateTracks = async (numTracks = 20) => {
  for (let i = 0; i < numTracks; i++) {
    const trackName = faker.word.words({ min: 1, max: 5 });
    const trackDuration = faker.number.int({ min: 60000, max: 600000 });

    await createTrack(trackName, trackDuration);
  }
};

const generatePlaylistTrackAssociations = async (numAssociations = 15) => {
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
  await generateUsers();
  await generatePlaylists();
  await generateTracks();
  await generatePlaylistTrackAssociations();
};

await db.connect();
await seed();
await db.end();

console.log('🌱 Database seeded.');
