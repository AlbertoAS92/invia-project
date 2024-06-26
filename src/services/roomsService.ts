import axios from 'axios';

import { RoomRoute } from '../models/room.model';

export const BASE_URL = 'https://dcontent.inviacdn.net/shared/dev/test-api/';

export const fetchAllRooms = async () => {
  const { data: allRoomsData } = await axios.get(`${BASE_URL}${RoomRoute.ALL}`);

  return allRoomsData;
};

export const fetchRoomAvailabilityById = async (roomId: number) => {
  const { data: roomAvailabilityData } = await axios.get(
    `${BASE_URL}${RoomRoute.ROOM}/${roomId}`
  );

  return roomAvailabilityData;
};
