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
  const pages = useSelector((state) => state.todos.pages);
  const page = useSelector((state) => state.status.page);
  const dispatch = useDispatch();

  const getPageList = () => {
    const list = [];
    const length = pages >= 3 ? 3 : pages;

    if (page === 1) {
      for (let i = 1; i <= length; i++) list.push(i);
    } else if (page < pages) {
      for (let i = page - 1; i <= page + 1; i++) if (i > 0) list.push(i);
    } else {
      for (let i = page - 2; i <= page; i++) if (i > 0) list.push(i);
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
        $mode={page === 1 ? "disabled" : 0}
        disabled={page === 1}
      ></ButtonPaginationStart>
      <ButtonPaginationLeft
        onClick={() => switchPages(page - 1)}
        $mode={page === 1 ? "disabled" : 0}
        disabled={page === 1}
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
        $mode={page === pages ? "disabled" : 0}
        disabled={page === pages}
      ></ButtonPaginationRight>
      <ButtonPaginationEnd
        onClick={() => switchPages(pages)}
        $mode={page === pages ? "disabled" : 0}
        disabled={page === pages}
      ></ButtonPaginationEnd>
    </PaginationWrapper>
  );
}

export default Pagination;
