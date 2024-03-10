export type User = {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
};

export type Track = {
  id: string;
  name: string;
  artistId: string;
  albumId: string;
  duration: number;
};
