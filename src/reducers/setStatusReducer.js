import constants from "../constants";

const initialState = {
  completed: null,
  completedAll: false,
  filter: "all",
  offset: 0,
  currentPage: 1,
  count: 0,
  errorMessage: "",
};

const {
  SET_COMPLETED,
  SET_PAGE,
  SET_OFFSET,
  SET_COUNT,
  SET_COMPLETED_ALL,
  SET_ERROR,
  SET_FILTER,
  TODOS_AT_PAGE,
} = constants;

export const setStatusReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_COMPLETED:
      return {
        ...state,
        completed: payload,
      };

    case SET_PAGE:
      return {
        ...state,
        offset: (payload - 1) * TODOS_AT_PAGE,
        currentPage: payload,
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: payload,
      };
    case SET_COMPLETED_ALL:
      return { ...state, completedAll: payload };
    case SET_COUNT:
      return { ...state, count: payload };
    case SET_ERROR:
      return { ...state, errorMessage: payload };
    case SET_FILTER:
      return { ...state, filter: payload };
    default:
      return { ...state };
  }
};
