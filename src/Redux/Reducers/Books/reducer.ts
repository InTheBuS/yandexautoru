import { Reducer } from 'redux';
import BooksListState from '../../State/BooksListState';
import {
  BooksActionTypes, BooksListActions,
} from '../../Actions/ActionTypes';

const initialState: BooksListState = {
  booksData: { numFound: 0, start: 0, docs: [] },
  isFetching: false,
  error: false,
  firstFetchOver: false,
  currentPage: 0,
  lastPage: 0,
};

const BooksReducer:Reducer<BooksListState, BooksListActions> = (state = initialState, action) => {
  switch (action.type) {
    case BooksActionTypes.GET_BOOKS_LIST_START: {
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    }
    case BooksActionTypes.GET_BOOKS_LIST_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: true,
        firstFetchOver: true,
        lastPage: 0,
        currentPage: 0,
      };
    }
    case BooksActionTypes.GET_BOOKS_LIST_SUCCESS: {
      const { numFound, start } = action.data;
      const lastPage = numFound ? Math.ceil(numFound / 100) : 0;
      const currentPage = start ? start / 100 + 1 : 0;
      return {
        ...state,
        isFetching: false,
        error: false,
        firstFetchOver: true,
        booksData: action.data,
        lastPage,
        currentPage,
      };
    }
    default:
      return state;
  }
};

export default BooksReducer;
