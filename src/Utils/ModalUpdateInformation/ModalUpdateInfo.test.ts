import { updateInformation } from './ModalUpdateBookInformation';
import { BookInformationType } from '../../Components/Modal';
import { bookInModalType } from '../../Components/App';

describe('modal update information function:', () => {
  const emptyObjectReturn: BookInformationType = {
    title: '',
    authorName: '',
    firstPublishYear: '',
    publisher: '',
    isbn: '',
  };
  const testObject: bookInModalType = {
    bookObject: {
      title: 'title',
      first_publish_year: 2021,
      isbn: ['123'],
      cover_i: 1,
      lccn: ['123'],
      oclc: ['123'],
      author_name: ['author'],
      publisher: ['publisher'],
    },
    image: 'image src',
  };
  const testObjectResult: BookInformationType = {
    title: 'Название книги: title',
    authorName: 'Имя авторов:  author',
    firstPublishYear: 'Дата публикации: 2021',
    publisher: 'Издательство:  publisher',
    isbn: 'ISBN книги: 123',
  };
  test('should return object', () => {
    expect(typeof updateInformation()).toBe('object');
    expect(typeof updateInformation()).toBe('object');
  });
  test('should return new object', () => {
    expect(updateInformation()).toBeTruthy();
    expect(updateInformation()).toEqual(emptyObjectReturn);
    expect(updateInformation(testObject)).toEqual(testObjectResult);
  });
});
