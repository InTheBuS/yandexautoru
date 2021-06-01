import { BookInformationType } from '../../Components/Modal';
import { bookInModalType } from '../../Components/App';

export function updateInformation(book: bookInModalType | undefined = undefined): BookInformationType {
  const newBook: BookInformationType = {
    title: '',
    authorName: '',
    firstPublishYear: '',
    publisher: '',
    isbn: '',
  };

  if (!book || !book.bookObject) return newBook;

  const passedBook = book.bookObject;

  newBook.title = `Название книги: ${
    passedBook.title
      ? passedBook.title
      : 'Название книги отсутствует'}`;
  newBook.authorName = `Имя авторов: ${
    passedBook.author_name
      ? passedBook.author_name.map((name) => ` ${name}`)
      : 'Имя автора отсутствует'}`;

  newBook.firstPublishYear = `Дата публикации: ${
    passedBook.first_publish_year
      ? passedBook.first_publish_year
      : 'Дата публикации отсутствует'}`;

  newBook.publisher = `Издательство: ${
    passedBook.publisher
      ? passedBook.publisher.map((publisher) => ` ${publisher}`)
      : 'Издательство отсутствует'}`;

  newBook.isbn = `ISBN книги: ${
    passedBook.isbn
      ? passedBook.isbn[0]
      : 'ISBN отсутствует'}`;

  return newBook;
}
