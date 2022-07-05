import {
  PaginationWrapper,
  ButtonPagination,
  ButtonPaginationStart,
  ButtonPaginationEnd,
  ButtonPaginationLeft,
  ButtonPaginationRight,
} from "../styles/components";

function Pagination({ pages, page, switchPages, count }) {
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
        $mode={page === count ? "disabled" : 0}
        disabled={page === count ? true : false}
      ></ButtonPaginationRight>
      <ButtonPaginationEnd
        onClick={() => switchPages(count)}
        $mode={page === count ? "disabled" : 0}
        disabled={page === count ? true : false}
      ></ButtonPaginationEnd>
    </PaginationWrapper>
  );
}

export default Pagination;
