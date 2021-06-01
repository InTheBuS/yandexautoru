import React, {
  ReactElement, useEffect, useMemo, useState,
} from 'react';
import styles from './index.module.css';
import { getBooksType } from '../App';

type Props = {
  currentPage: number,
  lastPage: number,
  getBooks: getBooksType,
  bookName: string,
  isFetching: boolean,
}

const widthPixelToChange = 840;
const showMorePagNums = 4;
const showLessPagNums = 2;

const disabled: React.CSSProperties = {
  pointerEvents: 'none',
  opacity: 0.5,
};

const Pagination: React.FC<Props> = ({
  currentPage, lastPage, getBooks, bookName, isFetching,
}: Props) => {
  const [size, setSize] = useState(window.innerWidth);
  const pagesToShow = useMemo(() => (size > widthPixelToChange ? showMorePagNums : showLessPagNums), [size, widthPixelToChange]);

  function handleResize() {
    const newSize = window.innerWidth || document.documentElement.clientWidth;
    setSize(newSize);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth || document.documentElement.clientWidth]);

  function onClickHandler(page: number) {
    getBooks(bookName, page);
  }

  const prevPage = (): ReactElement | undefined => {
    if (currentPage !== 1 && pagesToShow === showMorePagNums) {
      return (
        <div
          key="prev"
          style={isFetching ? disabled : undefined}
          className={`${styles.paginationItem} ${styles.prevAndNextCircle}`}
          onClick={() => { onClickHandler(currentPage - 1); }}
        >
          Предыдущая
        </div>
      );
    }
    return undefined;
  };

  const nextPage = (): ReactElement | undefined => {
    if (currentPage !== lastPage && pagesToShow === showMorePagNums) {
      return (
        <div
          key="next"
          style={isFetching ? disabled : undefined}
          className={`${styles.paginationItem} ${styles.prevAndNextCircle}`}
          onClick={() => { onClickHandler(currentPage + 1); }}
        >
          Следующая
        </div>
      );
    }
    return undefined;
  };

  const pagesArray: number[] = Array.from({ length: lastPage }).map((_, i) => i + 1);
  const pages = () => pagesArray.map((page): ReactElement | undefined => {
    if (page === 1 || page === lastPage) {
      return (
        <div
          style={isFetching ? disabled : undefined}
          className={`${styles.paginationItem} 
          ${currentPage === page ? styles.paginationItemActive : ''} 
          ${styles.paginationCircle} 
          ${styles.paginationNumber}`}
          key={page}
          onClick={() => { onClickHandler(page); }}
        >
          {`${page}`}
        </div>
      );
    }
    if (page < (pagesToShow + currentPage) && page > (currentPage - pagesToShow)) {
      return (
        <div
          style={isFetching ? disabled : undefined}
          className={`${styles.paginationItem} 
          ${currentPage === page ? styles.paginationItemActive : ''} 
          ${styles.paginationCircle} 
          ${styles.paginationNumber}`}
          key={page}
          onClick={() => { onClickHandler(page); }}
        >
          {page}
        </div>
      );
    }

    const rightSideDots = (page === currentPage + pagesToShow && pagesArray[currentPage + (pagesToShow + 1)]);
    const leftSideDots = (page === currentPage - pagesToShow && pagesArray[currentPage - (pagesToShow - 1)]);

    if (leftSideDots || rightSideDots) {
      return (
        <div
          key={page}
          style={isFetching ? disabled : undefined}
          className={`${styles.paginationItem} 
          ${styles.paginationCircle} 
          ${styles.paginationNumber}`}
          onClick={() => { onClickHandler(page); }}
        >
          ...
        </div>
      );
    }
    return undefined;
  });

  return (
    <div className={styles.paginationWrapper}>
      {prevPage()}
      {pages()}
      {nextPage()}
    </div>
  );
};

export default Pagination;
