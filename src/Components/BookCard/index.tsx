import React, { SyntheticEvent, useState } from 'react';
import styles from './index.module.css';
import { bookObject } from '../../Redux/Actions/ActionTypes';
import { checkForValidImageUrls } from '../../Utils/ImageUrl';
import { setBookInModalType, setShowModalType } from '../App';

type Props = {
  book: bookObject,
  index: number,
  setShowModal: setShowModalType,
  setBookInModal: setBookInModalType,
}

const BookCard: React.FC<Props> = ({
  book, index, setShowModal, setBookInModal,
}: Props) => {
  function openModalHandler() {
    setShowModal(true);
    setBookInModal({ bookObject: book, image });
  }
  function handleImageOnError(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = urls[i + 1];
    setImage(urls[i + 1]);
    setIndex(i + 1);
  }

  const urls: string[] = checkForValidImageUrls(book);
  const [i, setIndex] = useState(0);
  const [image, setImage] = useState(urls[0]);
  const title = book.title ? `Титул: ${book.title}` : 'Титул отсутствует';
  const authorName = book.author_name ? `Авторы: ${book.author_name.map((name) => ` ${name}`)}` : 'Автор отсутствует';

  return (
    <div
      role="presentation"
      className={styles.bookWrapper}
      key={title + authorName + index}
      onClick={openModalHandler}
    >
      <img alt="book_image" className={styles.bookImage} src={urls[0]} onError={handleImageOnError} />
      <div className={styles.bookInfo}>
        <div className={styles.bookInfoName}>{title}</div>
        <div className={styles.bookInfoAuthor}>{authorName}</div>
      </div>
    </div>
  );
};

export default BookCard;
