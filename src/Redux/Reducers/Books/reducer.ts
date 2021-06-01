import { Reducer } from 'redux';
import BooksListState from '../../State/BooksListState';
import {
  BooksActionTypes, BooksListActions,
} from '../../Actions/ActionTypes';

const initialState: BooksListState = {
  booksData: {
    num_found: 0, numFound: 0, start: 0, docs: [],
  },
  isFetching: false,
  error: false,
  firstFetchOver: false,
  currentPage: 0,
  lastPage: 0,
};

const firstPage = 1;
const maxItemsPerPage = 100;

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
        errorMessage: action.error,
        firstFetchOver: true,
        lastPage: 0,
        currentPage: 0,
      };
    }
    case BooksActionTypes.GET_BOOKS_LIST_SUCCESS: {
      const { numFound, start } = action.data;

      const lastPage: number = numFound ? Math.ceil(numFound / maxItemsPerPage) : firstPage;
      const currentPage: number = start ? start / maxItemsPerPage + firstPage : firstPage;
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
