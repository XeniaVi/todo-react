import {
  PaginationWrapper,
  ButtonPagination,
  ButtonPaginationStart,
  ButtonPaginationEnd,
  ButtonPaginationLeft,
  ButtonPaginationRight,
} from "../styles/components";

function Pagination({ pages }) {
  return (
    <PaginationWrapper>
      <ButtonPaginationStart $mode={"disabled"}></ButtonPaginationStart>
      <ButtonPaginationLeft $mode={"disabled"}></ButtonPaginationLeft>
      {pages.map((item) => (
        <ButtonPagination $mode={"select"} key={item}>
          {item}
        </ButtonPagination>
      ))}
      <ButtonPaginationRight></ButtonPaginationRight>
      <ButtonPaginationEnd></ButtonPaginationEnd>
    </PaginationWrapper>
  );
}

export default Pagination;
