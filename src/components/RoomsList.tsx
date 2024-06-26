import { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import RoomListItem from './RoomListItem';
import {
  Room,
  ROOMS_PAGE_SIZE,
  RoomsListSortOption,
  RoomsListSortOptions,
} from '../models/room.model';
import { fetchAllRooms } from '../services/roomsService';

const RoomsList = () => {
  const {
    data: roomsList,
    isLoading,
    isPending,
    error,
  } = useQuery<Room[]>({
    queryKey: ['roomsList'],
    queryFn: fetchAllRooms,
  });

  const [sortCriteria, setSortCriteria] = useState<RoomsListSortOptions>(
    RoomsListSortOption.Price
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortedRoomsList = useMemo(() => {
    if (!roomsList) {
      return [];
    }

    return [...roomsList].sort((a: Room, b: Room) => {
      if (sortCriteria === RoomsListSortOption.Name) {
        return a.name.localeCompare(b.name);
      } else {
        return a.price.value - b.price.value;
      }
    });
  }, [roomsList, sortCriteria]);

  const paginatedRoomsList = useMemo(() => {
    const startIndex = (currentPage - 1) * ROOMS_PAGE_SIZE;

    return sortedRoomsList.slice(startIndex, startIndex + ROOMS_PAGE_SIZE);
  }, [sortedRoomsList, currentPage]);

  const handleSortCriteria = (event: any) =>
    setSortCriteria(event.target.value as RoomsListSortOptions);

  const handleCurrentPage = (next: boolean) => {
    if (next) {
      setCurrentPage((currentPage: number) =>
        roomsList && currentPage * ROOMS_PAGE_SIZE < roomsList.length
          ? currentPage + 1
          : currentPage
      );
    } else {
      setCurrentPage((currentPage: number) => Math.max(currentPage - 1, 1));
    }
  };

  if (isLoading || isPending) {
    return <div>Loading rooms...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl">Rooms</h1>
      <div className="mt-4 mb-3">
        <label htmlFor="sort" className="mr-2 font-medium text-gray-700">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={handleSortCriteria}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        >
          <option value={RoomsListSortOption.Name}>Name</option>
          <option value={RoomsListSortOption.Price}>Price</option>
        </select>
      </div>
      <div className="flex flex-col space-y-3 mt-4">
        {paginatedRoomsList.map((room) => (
          <div key={room.id}>
            <RoomListItem roomItem={room} />
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <button
          onClick={handleCurrentPage.bind(this, false)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        >
          Previous
        </button>
        <span className="px-2 underline underline-offset-4">
          Page {currentPage}{' '}
        </span>
        <button
          onClick={handleCurrentPage.bind(this, true)}
          disabled={roomsList && currentPage * 4 >= roomsList.length}
          className={`px-4 py-2 mx-1 border rounded ${roomsList && currentPage * 4 >= roomsList.length ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoomsList;
