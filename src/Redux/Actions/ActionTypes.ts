export enum BooksActionTypes {
  GET_BOOKS_LIST_START = 'GET_BOOKS_LIST_START',
  GET_BOOKS_LIST_SUCCESS = 'GET_BOOKS_LIST_SUCCESS',
  GET_BOOKS_LIST_FAILURE = 'GET_BOOKS_LIST_FAILURE',
}

export type bookObject = {
  title: string,
  first_publish_year: number,
  isbn: string[],
  cover_i: number,
  lccn: string[],
  oclc: string[],
  author_name: string[],
  publisher: string[]
}

export type BooksResponse = {
  numFound: number,
  start: number,
  docs: bookObject[],
}

export type IGetBooksListStart = {
  type: BooksActionTypes.GET_BOOKS_LIST_START,
};

export type IGetBooksListFailure = {
  type: BooksActionTypes.GET_BOOKS_LIST_FAILURE,
  error: string
};

export type IGetBooksListSuccess = {
  type: BooksActionTypes.GET_BOOKS_LIST_SUCCESS,
  data: BooksResponse,
};

export type BooksListActions =
  IGetBooksListStart
  | IGetBooksListFailure
  | IGetBooksListSuccess;
