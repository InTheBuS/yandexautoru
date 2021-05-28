import { BooksResponse } from '../Actions/ActionTypes';

type BooksListState = {
  booksData: BooksResponse,
  isFetching: boolean,
  error: boolean,
  firstFetchOver: boolean,
  currentPage: number,
  lastPage: number,
}

export default BooksListState;
