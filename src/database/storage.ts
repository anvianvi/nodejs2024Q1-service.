import { Album, Track, User } from 'src/types';

export const database = {
  users: new Array<User>(),
  tracks: new Array<Track>(),
  albums: new Array<Album>(),
};
