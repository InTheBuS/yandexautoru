import React, { SyntheticEvent, useMemo, useState } from 'react';
import styles from './index.module.css';
import { bookObject } from '../../Redux/Actions/ActionTypes';
import { checkForValidImageUrls } from '../../Utils/ImageUrl/ImageUrl';
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
    e.currentTarget.src = urls[indexOfPhoto + 1];
    setImage(urls[indexOfPhoto + 1]);
    setIndexOfPhoto(indexOfPhoto + 1);
  }

  const urls: string[] = useMemo(() => checkForValidImageUrls(book), [book]);
  const [indexOfPhoto, setIndexOfPhoto] = useState(0);
  const [image, setImage] = useState(urls[indexOfPhoto]);
  const title = useMemo(() => (book.title ? `Титул: ${book.title}` : 'Титул отсутствует'), [book.title]);
  const authorName = useMemo(() => (book.author_name
    ? `Авторы: ${book.author_name.map((name) => ` ${name}`)}`
    : 'Автор отсутствует'), [book.author_name]);

  return (
    <div
      role="presentation"
      className={styles.bookWrapper}
      key={title + authorName + index}
      onClick={openModalHandler}
    >
      <div className={styles.bookImageWrapper}>
        <img alt="book_image" className={styles.bookImage} src={urls[0]} onError={handleImageOnError} />
      </div>
      <div className={styles.bookInfo}>
        <div className={styles.bookInfoName}>{title}</div>
        <div className={styles.bookInfoAuthor}>{authorName}</div>
      </div>
    </div>
  );
};

export default BookCard;
