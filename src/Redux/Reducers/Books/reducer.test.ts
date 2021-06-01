import BooksReducer from './reducer';
import { BooksActionTypes } from '../../Actions/ActionTypes';
import BooksListState from '../../State/BooksListState';

describe('books reducer:', () => {
  let data: BooksListState = {
    booksData: {
      num_found: 0, numFound: 0, start: 0, docs: [],
    },
    isFetching: false,
    error: false,
    firstFetchOver: false,
    currentPage: 0,
    lastPage: 0,
  }; beforeEach(() => {
    data = {
      booksData: {
        num_found: 0, numFound: 0, start: 0, docs: [],
      },
      isFetching: false,
      error: false,
      firstFetchOver: false,
      currentPage: 0,
      lastPage: 0,
    };
  });
  test('should return initial state:', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(BooksReducer(undefined, { type: undefined })).toEqual(data);
  });
  test('should return data with fetch = true:', () => {
    data.isFetching = true;
    expect(BooksReducer(undefined, { type: BooksActionTypes.GET_BOOKS_LIST_START }))
      .toEqual(data);
  });
  test('should return data with error message', () => {
    data.errorMessage = 'error';
    data.error = true;
    data.firstFetchOver = true;
    expect(BooksReducer(undefined, { type: BooksActionTypes.GET_BOOKS_LIST_FAILURE, error: 'error' }))
      .toEqual(data);
  });
  test('should return data with fetch = success', () => {
    const responseData = {
      num_found: 0, numFound: 10, start: 0, docs: [],
    };
    data.booksData = responseData;
    data.currentPage = 1;
    data.lastPage = 1;
    data.firstFetchOver = true;
    expect(BooksReducer(undefined, { type: BooksActionTypes.GET_BOOKS_LIST_SUCCESS, data: responseData }))
      .toEqual(data);
  });
});
