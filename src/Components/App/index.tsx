import React, { useState } from 'react';
import { connect } from 'react-redux';
import { GetBooksThunkDispatch, getBookByBookName } from '../../Redux/Actions/Books/action';
import AppState from '../../Redux/State/AppState';
import BooksListState from '../../Redux/State/BooksListState';
import styles from './index.module.css';
import Search from '../Search';
import BooksList from '../ListContainer';
import Modal from '../Modal/index';
import { bookObject } from '../../Redux/Actions/ActionTypes';

interface Props {
  booksReducer: BooksListState,
  getBooks: (name: string, page: number) => void,
}

export type setShowModalType = React.Dispatch<React.SetStateAction<boolean>>
export type setBookInModalType = React.Dispatch<React.SetStateAction<null | { bookObject: bookObject, image: string }>>
export type bookInModalType = { bookObject: bookObject, image: string } | null

const App = ({ booksReducer, getBooks }: Props) => {
  window.addEventListener('scroll', loadOnScrollHandler);
  function loadOnScrollHandler() {
    console.log(
      window.pageYOffset,
      document.documentElement.scrollHeight,
      document.documentElement.scrollTop,
      window.innerHeight, 'check this',
    );
    const currentPos = window.pageYOffset || document.documentElement.scrollTop;
    if (currentPos + window.innerHeight + 1200 > document.documentElement.scrollHeight) {
      console.log('need to load');
    }
  }
  const [bookName, setBookName] = useState('');
  const [showModal, setShowModal]: [boolean, setShowModalType] = useState<boolean>(false);
  const [bookInModal, setBookInModal] = useState<bookInModalType>(null);
  return (
    <div className={styles.App}>
      <Search
        bookName={bookName}
        setBookName={setBookName}
        getBooks={getBooks}
      />
      <BooksList
        booksList={booksReducer.booksData}
        firstFetchOver={booksReducer.firstFetchOver}
        setShowModal={setShowModal}
        setBookInModal={setBookInModal}
        isFetching={booksReducer.isFetching}
        fetchError={booksReducer.error}
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
