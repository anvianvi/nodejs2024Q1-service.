import { Album, Artist, Track, User } from 'src/types';

export const database = {
  users: new Array<User>(),
  artists: new Array<Artist>(),
  tracks: new Array<Track>(),
  albums: new Array<Album>(),
  favorites: {
    albums: [],
    artists: [],
    tracks: [],
  },
};
