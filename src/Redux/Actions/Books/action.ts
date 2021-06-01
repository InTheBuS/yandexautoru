import { AnyAction, Dispatch } from 'redux';
import OpenLibraryAPI from '../../../API';
import {
  BooksActionTypes,
  IGetBooksListFailure, IGetBooksListStart, IGetBooksListSuccess, BooksResponse,
} from '../ActionTypes';

export const getBooksStart = (): IGetBooksListStart => ({
  type: BooksActionTypes.GET_BOOKS_LIST_START,
});

export const getBooksFailure = (message: string): IGetBooksListFailure => ({
  type: BooksActionTypes.GET_BOOKS_LIST_FAILURE,
  error: message,
});

export const getBooksSuccess = (data: BooksResponse): IGetBooksListSuccess => ({
  type: BooksActionTypes.GET_BOOKS_LIST_SUCCESS,
  data,
});

export const getBookByBookName = (tittle: string, page: number) => async (dispatch: Dispatch): Promise<AnyAction> => {
  dispatch(getBooksStart());
  return new OpenLibraryAPI()
    .getBooks(tittle, page)
    .then((response) => dispatch(getBooksSuccess(response.data)))
    .catch((error) => dispatch(getBooksFailure(`Could not get books list: ${error.message}`)));
};
