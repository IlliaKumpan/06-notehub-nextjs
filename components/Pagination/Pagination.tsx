import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from './Pagination.module.css';

type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      nextLabel=">"
      previousLabel="<"
      forcePage={currentPage - 1} 
      pageCount={totalPages}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      breakLabel="..."
    />
  );
}