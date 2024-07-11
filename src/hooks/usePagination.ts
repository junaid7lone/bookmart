import { useState } from 'react';

interface PaginationResult<T> {
  currentPage: number;
  itemsPerPage: number;
  paginatedItems: T[];
  totalItems: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const usePagination = <T>(
  items: T[],
  itemsPerPage: number
): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    currentPage,
    itemsPerPage,
    paginatedItems,
    totalItems,
    totalPages,
    setCurrentPage,
  };
};
