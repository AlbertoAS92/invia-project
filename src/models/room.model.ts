export type Price = {
  value: number;
  currencyCode: string;
};

export type RoomAvailability = {
  availabilityStatus?: RoomAvailabilityStatuses;
  price: Price;
};

export type Room = {
  id: number;
  name: string;
  price: Price;
};

export type RoomsListSortOptions = 'name' | 'price';

export type RoomAvailabilityStatuses =
  | 'available'
  | 'onRequest'
  | 'soldout'
  | 'error';

export enum RoomsListSortOption {
  Name = 'name',
  Price = 'price',
}

export enum RoomAvailabilityStatus {
  Available = 'available',
  OnRequest = 'onRequest',
  Soldout = 'soldout',
  Error = 'error',
}

export enum RoomRoute {
  ALL = 'rooms',
  ROOM = 'room',
}

export const ROOMS_PAGE_SIZE = 4;
