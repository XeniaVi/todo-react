import { useDispatch, useSelector } from "react-redux";
import { setPageAction } from "../actions";
import {
  PaginationWrapper,
  ButtonPagination,
  ButtonPaginationStart,
  ButtonPaginationEnd,
  ButtonPaginationLeft,
  ButtonPaginationRight,
} from "../styles/components";

function Pagination() {
  const dispatch = useDispatch();

  const pagesCount = useSelector((state) => state.todos.pagesCount);
  const currentPage = useSelector((state) => state.status.currentPage);

  const getPageList = () => {
    const list = [];
    const length = pagesCount >= 3 ? 3 : pagesCount;

    if (currentPage === 1) {
      for (let i = 1; i <= length; i++) list.push(i);
    } else if (currentPage < pagesCount) {
      for (let i = currentPage - 1; i <= currentPage + 1; i++)
        if (i > 0) list.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage; i++)
        if (i > 0) list.push(i);
    }

    return list;
  };

  const switchPages = (value) => {
    dispatch(setPageAction(value));
  };

  return (
    <PaginationWrapper>
      <ButtonPaginationStart
        onClick={() => switchPages(1)}
        $mode={currentPage === 1 ? "disabled" : 0}
        disabled={currentPage === 1}
      ></ButtonPaginationStart>
      <ButtonPaginationLeft
        onClick={() => switchPages(currentPage - 1)}
        $mode={currentPage === 1 ? "disabled" : 0}
        disabled={currentPage === 1}
      ></ButtonPaginationLeft>
      {getPageList().map((item) => (
        <ButtonPagination
          onClick={() => switchPages(item)}
          $mode={item === currentPage ? "select" : ""}
          key={item}
        >
          {item}
        </ButtonPagination>
      ))}
      <ButtonPaginationRight
        onClick={() => switchPages(currentPage + 1)}
        $mode={currentPage === pagesCount ? "disabled" : 0}
        disabled={currentPage === pagesCount}
      ></ButtonPaginationRight>
      <ButtonPaginationEnd
        onClick={() => switchPages(pagesCount)}
        $mode={currentPage === pagesCount ? "disabled" : 0}
        disabled={currentPage === pagesCount}
      ></ButtonPaginationEnd>
    </PaginationWrapper>
  );
}

export default Pagination;
