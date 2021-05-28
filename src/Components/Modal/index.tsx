import React, { useEffect } from 'react';
import styles from './index.module.css';
import { setShowModalType, bookInModalType, setBookInModalType } from '../App';
import { imageSize } from '../../Utils/ImageUrl';
import { updateInformation } from '../../Utils/ModalUpdateBookInformation';

type Props = {
  showModal: boolean,
  setShowModal: setShowModalType,
  bookInModal: bookInModalType,
  setBookInModal: setBookInModalType
}

export type BookInformationType = {
  title: string,
  authorName: string,
  firstPublishYear: string,
  publisher: string,
  isbn: string,
}

const Modal: React.FC<Props> = ({
  showModal, setShowModal, bookInModal, setBookInModal,
}: Props) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', keyDownModalHandler);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', keyDownModalHandler);
    };
  }, [showModal]);

  function closeModalHandler() {
    setShowModal(false);
    setBookInModal(null);
  }
  function keyDownModalHandler(event: KeyboardEvent) {
    const { keyCode } = event;
    if (keyCode === 27) {
      setShowModal(false);
      setBookInModal(null);
    }
  }

  const bigImage = bookInModal ? imageSize(bookInModal?.image, '-L') : '';
  const newBook: BookInformationType = updateInformation(bookInModal);

  return (
    <div
      role="presentation"
      style={{ display: showModal ? '' : 'none' }}
      className={styles.modalWrapper}
      onClick={closeModalHandler}
    >
      <div
        className={styles.modalWindow}
        onClick={(event) => event.stopPropagation()}
        role="presentation"
      >
        <img className={styles.modalImage} src={bigImage} alt="book" />
        <div className={styles.modalInfoWrapper}>
          <button className={styles.modalCloseButton} type="button" onClick={closeModalHandler}>X</button>
          <div className={styles.modalInfoBookName}>
            {newBook.title}
          </div>
          <div className={styles.modalInfoAuthorName}>
            {newBook.authorName}
          </div>
          <div className={styles.modalInfoPublicationDate}>
            {newBook.firstPublishYear}
          </div>
          <div className={styles.modalInfoPublisher}>
            {newBook.publisher}
          </div>
          <div className={styles.modalInfoIsbn}>
            {newBook.isbn}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
