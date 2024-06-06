export type Position = {
  lat: number;
  lng: number;
};

export type DataType = {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: Position;
};

export type UserType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
