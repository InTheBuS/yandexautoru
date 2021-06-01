import React, {
  ReactElement,
} from 'react';
import BookCard from '../BookCard';
import styles from './index.module.css';
import { BooksResponse } from '../../Redux/Actions/ActionTypes';
import { getBooksType, setBookInModalType, setShowModalType } from '../App';
import Pagination from '../Pagination';

type Props = {
  booksList: BooksResponse,
  setShowModal: setShowModalType,
  setBookInModal: setBookInModalType,
  isFetching: boolean,
  fetchError: boolean,
  firstFetchOver: boolean,
  lastPage: number,
  currentPage: number,
  getBooks: getBooksType,
  bookName: string
}

const BooksList: React.FC<Props> = ({
  booksList,
  setShowModal,
  setBookInModal,
  isFetching,
  fetchError,
  firstFetchOver,
  lastPage,
  currentPage,
  getBooks,
  bookName,
}: Props) => {
  const whatToShow = (): ReactElement => {
    if (booksList.numFound && !isFetching) {
      const mappedBooksList = booksList.docs.map((book, index) => (
        <BookCard
          /* eslint-disable-next-line react/no-array-index-key */
          key={book.author_name + book.title + book.first_publish_year + index}
          book={book}
          index={index}
          setShowModal={setShowModal}
          setBookInModal={setBookInModal}
        />
      ));
      return (
        <div className={styles.BookItems}>
          {mappedBooksList}
        </div>
      );
    }
    if (isFetching) {
      return <div>Поиск...</div>;
    }
    if (fetchError) {
      return <div>Произошла ошибка...</div>;
    }
    if (!firstFetchOver) {
      return <div>Попробуй найти нужную книгу!</div>;
    }
    return <div>Книги не найдены</div>;
  };
  const showPagination = (): ReactElement | undefined => {
    if ((lastPage === currentPage && lastPage === 1) || (lastPage === currentPage && lastPage === 0)) {
      return undefined;
    }
    return (
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        getBooks={getBooks}
        bookName={bookName}
        isFetching={isFetching}
      />
    );
  };
  return (
    <div className={styles.BooksListWrapper}>
      {whatToShow()}
      {showPagination()}
    </div>
  );
};

export default BooksList;
