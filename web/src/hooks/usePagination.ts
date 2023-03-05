import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

const PAGE_SIZE = 10;

export const usePagination = <T>(items: T[] | undefined) => {
  const [page, setPage] = useState(1);
  const { query, push } = useRouter();

  useEffect(() => {
    if (query.page) {
      const page = parseInt(query.page as string);
      if (page) {
        setPage(page);
      }
    }
  }, [query]);

  const setQueryParam = useCallback(
    (page: number) => {
      push(`?page=${page}`);
    },
    [push]
  );

  if (!items) return { page, setPage, items: [], numberOfPages: 0 };

  const numberOfPages = Math.ceil(items.length / PAGE_SIZE);

  const itemsOnPage = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePrevious = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      setQueryParam(newPage);
    }
  };

  const handleNext = () => {
    if (page < numberOfPages) {
      const newPage = page + 1;
      setPage(newPage);
      setQueryParam(newPage);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage <= numberOfPages && newPage > 0) {
      setPage(newPage);
      setQueryParam(newPage);
    }
  };

  return {
    page,
    handlePageChange,
    items: itemsOnPage,
    numberOfPages,
    handlePrevious,
    handleNext,
  };
};
