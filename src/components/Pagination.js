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
        $mode={page === 1 ? "disabled" : 0}
      ></ButtonPaginationStart>
      <ButtonPaginationLeft
        $mode={page === 1 ? "disabled" : 0}
      ></ButtonPaginationLeft>
      {pages.map((item) => (
        <ButtonPagination
          $mode={item === page ? "select" : ""}
          onClick={switchPages}
          key={item}
        >
          {item}
        </ButtonPagination>
      ))}
      <ButtonPaginationRight
        $mode={page === pages.length ? "disabled" : 0}
      ></ButtonPaginationRight>
      <ButtonPaginationEnd
        $mode={page === pages.length ? "disabled" : 0}
      ></ButtonPaginationEnd>
    </PaginationWrapper>
  );
}

export default Pagination;
