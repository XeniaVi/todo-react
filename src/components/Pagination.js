import { useEffect, useState } from "react";
import {
  PaginationWrapper,
  ButtonPagination,
  ButtonPaginationStart,
  ButtonPaginationEnd,
  ButtonPaginationLeft,
  ButtonPaginationRight,
} from "../styles/components";

function Pagination({ page, switchPages, totalCount, limit }) {
  const [pagesCount, setPagesCount] = useState(0);

  const countPages = () => {
    setPagesCount(Math.ceil(totalCount / limit));
  };

  useEffect(() => countPages(), [totalCount]);

  const getPageList = () => {
    const list = [];
    const length = pagesCount >= 3 ? 3 : pagesCount;

    if (page === 1) {
      for (let i = 1; i <= length; i++) list.push(i);
    } else if (page < pagesCount) {
      for (let i = page - 1; i <= page + 1; i++) if (i > 0) list.push(i);
    } else {
      for (let i = page - 2; i <= page; i++) if (i > 0) list.push(i);
    }

    return list;
  };

  return (
    <PaginationWrapper>
      <ButtonPaginationStart
        onClick={() => switchPages(1)}
        $mode={page === 1 ? "disabled" : 0}
        disabled={page === 1 ? true : false}
      ></ButtonPaginationStart>
      <ButtonPaginationLeft
        onClick={() => switchPages(page - 1)}
        $mode={page === 1 ? "disabled" : 0}
        disabled={page === 1 ? true : false}
      ></ButtonPaginationLeft>
      {getPageList().map((item) => (
        <ButtonPagination
          onClick={() => switchPages(item)}
          $mode={item === page ? "select" : ""}
          key={item}
        >
          {item}
        </ButtonPagination>
      ))}
      <ButtonPaginationRight
        onClick={() => switchPages(page + 1)}
        $mode={page === pagesCount ? "disabled" : 0}
        disabled={page === pagesCount ? true : false}
      ></ButtonPaginationRight>
      <ButtonPaginationEnd
        onClick={() => switchPages(pagesCount)}
        $mode={page === pagesCount ? "disabled" : 0}
        disabled={page === pagesCount ? true : false}
      ></ButtonPaginationEnd>
    </PaginationWrapper>
  );
}

export default Pagination;
