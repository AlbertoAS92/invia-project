import { FC, memo, useState } from 'react';

import { fetchRoomAvailabilityById } from '../services/roomsService';
import {
  Room,
  RoomAvailability,
  RoomAvailabilityStatus,
} from '../models/room.model';

const RoomListItem: FC<{ roomItem: Room }> = ({ roomItem }) => {
  const [roomAvailability, setRoomAvailability] =
    useState<RoomAvailability | null>(null);

  const handleOnCheckAvailability = async () => {
    try {
      const roomAvailabilityData = await fetchRoomAvailabilityById(roomItem.id);

      setRoomAvailability(roomAvailabilityData);
    } catch (error) {
      console.error(
        'Error fetching availability for the room',
        roomItem.id,
        ' Error: ',
        error
      );
    }
  };

  return (
    <div className="max-w-xl rounded overflow-hidden shadow-lg p-4 bg-white border border-blue-100">
      <div className="flex">
        <p className="flex-1 font-bold text-xl mb-2">{roomItem.name}</p>
        <div
          className={`rounded-full p-2 h-2 w-2 ${roomAvailability?.availabilityStatus === RoomAvailabilityStatus.Available ? 'bg-green-500' : 'bg-gray-500'}`}
        ></div>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-600 font-semibold text-2xl">
          {roomItem.price.value} {roomItem.price.currencyCode}
        </p>
        {roomAvailability?.price && (
          <p className="text-gray-600 font-semibold text-2xl">
            <span className="font-light text-lg">New Price</span>{' '}
            {roomAvailability.price.value}{' '}
            {roomAvailability.price?.currencyCode}
          </p>
        )}
      </div>
      {roomAvailability && (
        <p className="font-light text-lg mt-2">
          <span className="font-normal">Availability:</span>{' '}
          {roomAvailability.availabilityStatus}
        </p>
      )}
      <div className="flex justify-between mt-2">
        <button
          onClick={handleOnCheckAvailability}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Check availability
        </button>
        <button
          onClick={() => console.info('Booked room', roomItem.name)}
          disabled={
            roomAvailability?.availabilityStatus !==
            RoomAvailabilityStatus.Available
          }
          className="disabled:bg-gray-500 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default memo(RoomListItem);
