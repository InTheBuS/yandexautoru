import {
  applyMiddleware, combineReducers, createStore, Store,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import BooksReducer from './Reducers/Books/reducer';
import AppState from './State/AppState';
import { BooksListActions } from './Actions/ActionTypes';

const rootReducer = combineReducers({
  booksReducer: BooksReducer,
});

export default function configureStore(): Store<AppState, BooksListActions> {
  return createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)));
}
