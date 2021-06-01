import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  getBookByBookName,
  getBooksFailure, getBooksStart, getBooksSuccess,
} from './action';
import { GetBooksThunkDispatch, BooksActionTypes, BooksResponse } from '../ActionTypes';

import 'node-fetch';

const middlewares = [thunk];
const mockStore = configureMockStore<BooksResponse, GetBooksThunkDispatch>(middlewares);

const data = {
  numFound: 0,
  num_found: 0,
  start: 0,
  docs: [],
};
const messageError = 'error';

describe('testing books actions:', () => {
  test('should create GET_BOOKS_LIST_START action', () => {
    const expectedAction = {
      type: BooksActionTypes.GET_BOOKS_LIST_START,
    };
    expect(getBooksStart()).toEqual(expectedAction);
  });
  test('should create GET_BOOKS_LIST_FAILURE action', () => {
    const response: BooksResponse = data;
    const expectedAction = {
      type: BooksActionTypes.GET_BOOKS_LIST_SUCCESS,
      data: response,
    };
    expect(getBooksSuccess(response)).toEqual(expectedAction);
  });
  test('should create GET_BOOKS_LIST_FAILURE action', () => {
    const errorMessage = 'error';
    const expectedAction = {
      type: BooksActionTypes.GET_BOOKS_LIST_FAILURE,
      error: errorMessage,
    };
    expect(getBooksFailure(errorMessage)).toEqual(expectedAction);
  });
});

/**
 * Не смог найти подходящий статический URL для тестов, который бы всегда возвращал один статичный объект,
 * поэтому использовал поиск по url, который возвращает нулевой объект.
*/
describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('testing getBookByBookName redux-thunk', () => {
    fetchMock.getOnce('http://openlibrary.org/search.json', {
      data,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActionsSuccess = [
      { type: BooksActionTypes.GET_BOOKS_LIST_START },
      {
        type: BooksActionTypes.GET_BOOKS_LIST_SUCCESS,
        data,
      },
    ];

    const store = mockStore({
      numFound: 0,
      num_found: 0,
      numFoundExact: true,
      start: 0,
      docs: [],
    });

    return store.dispatch(getBookByBookName('qqqqqqqwweryuiopasdfhghjklzxcwqtwetbnnmvbnmcxv', 1))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActionsSuccess);
      });
  });
});
