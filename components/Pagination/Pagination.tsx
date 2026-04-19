import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from './Pagination.module.css';

type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;
interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (nextPage: number) => void;
}


export default function Pagination({ pageCount, forcePage, onPageChange }: PaginationProps) {

  return (

    <ReactPaginate
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageCount={pageCount}
      forcePage={forcePage}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
    />
  );

}
    