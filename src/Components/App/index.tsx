import React, { Dispatch, SetStateAction, useState } from 'react';
import { connect } from 'react-redux';
import { getBookByBookName } from '../../Redux/Actions/Books/action';
import { GetBooksThunkDispatch, bookObject } from '../../Redux/Actions/ActionTypes';
import AppState from '../../Redux/State/AppState';
import BooksListState from '../../Redux/State/BooksListState';
import styles from './index.module.css';
import Search from '../Search';
import BooksList from '../ListContainer';
import Modal from '../Modal/index';

interface Props {
  booksReducer: BooksListState,
  getBooks: getBooksType
}

export type setShowModalType = React.Dispatch<React.SetStateAction<boolean>>
export type setBookNameType = Dispatch<SetStateAction<string>>
export type setBookInModalType = React.Dispatch<React.SetStateAction<null | { bookObject: bookObject, image: string }>>
export type bookInModalType = { bookObject: bookObject, image: string } | null
export type getBooksType = (name: string, page: number) => void

const App = ({ booksReducer, getBooks }: Props) => {
  const [bookName, setBookName]: [string, setBookNameType] = useState('');
  const [showModal, setShowModal]: [boolean, setShowModalType] = useState<boolean>(false);
  const [bookInModal, setBookInModal] = useState<bookInModalType>(null);
  return (
    <div className={styles.App}>
      <Search
        bookName={bookName}
        setBookName={setBookName}
        getBooks={getBooks}
        isFetching={booksReducer.isFetching}
      />
      <BooksList
        booksList={booksReducer.booksData}
        firstFetchOver={booksReducer.firstFetchOver}
        setShowModal={setShowModal}
        setBookInModal={setBookInModal}
        isFetching={booksReducer.isFetching}
        fetchError={booksReducer.error}
        currentPage={booksReducer.currentPage}
        lastPage={booksReducer.lastPage}
        getBooks={getBooks}
        bookName={bookName}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        bookInModal={bookInModal}
        setBookInModal={setBookInModal}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  booksReducer: state.booksReducer,
});

const mapDispatchToProps = (dispatch: (GetBooksThunkDispatch)) => ({
  getBooks: (bookName: string, page: number) => dispatch(getBookByBookName(bookName, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
