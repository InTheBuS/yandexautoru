import React, {
  ReactElement,
} from 'react';
import BookCard from '../BookCard';
import styles from './index.module.css';
import { BooksResponse } from '../../Redux/Actions/ActionTypes';
import { setBookInModalType, setShowModalType } from '../App';

type Props = {
  booksList: BooksResponse,
  setShowModal: setShowModalType,
  setBookInModal: setBookInModalType,
  isFetching: boolean,
  fetchError: boolean,
  firstFetchOver: boolean
}

const BooksList: React.FC<Props> = ({
  booksList, setShowModal, setBookInModal, isFetching, fetchError, firstFetchOver,
}: Props) => {
  const whatToShow = (): ReactElement => {
    if (booksList.numFound && !isFetching) {
      const mappedBooksList = booksList.docs.map((book, index) => (
        <BookCard
          key={book.author_name + book.title + book.first_publish_year + index}
          book={book}
          index={index}
          setShowModal={setShowModal}
          setBookInModal={setBookInModal}
        />
      )); // 3
      return (
        <div className={styles.BookItems}>
          {mappedBooksList}
        </div>
      );
    }
    if (!fetchError && isFetching) {
      return <div>Поиск...</div>; // 2
    }
    if (fetchError) {
      return <div>Произошла ошибка...</div>; // 4
    }
    if (!firstFetchOver) {
      return <div>Попробуй найти нужную книгу!</div>;
    }
    return <div>Книги не найдены</div>; // 1
  };

  return (
    <div className={styles.BooksListWrapper}>
      {whatToShow()}
    </div>
  );
};

export default BooksList;
