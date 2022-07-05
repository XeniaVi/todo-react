import {
  PaginationWrapper,
  ButtonPagination,
  ButtonPaginationStart,
  ButtonPaginationEnd,
  ButtonPaginationLeft,
  ButtonPaginationRight,
} from "../styles/components";

function Pagination({ pages, page, switchPages }) {
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
      {pages.map((item) => (
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
        $mode={page === pages.length ? "disabled" : 0}
        disabled={page === pages.length ? true : false}
      ></ButtonPaginationRight>
      <ButtonPaginationEnd
        onClick={() => switchPages(pages.length)}
        $mode={page === pages.length ? "disabled" : 0}
        disabled={page === pages.length ? true : false}
      ></ButtonPaginationEnd>
    </PaginationWrapper>
  );
}

export default Pagination;
