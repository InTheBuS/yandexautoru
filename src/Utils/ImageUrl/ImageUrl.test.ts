import { imageUrl, imageSize, checkForValidImageUrls } from './ImageUrl';
import { bookObject } from '../../Redux/Actions/ActionTypes';
// eslint-disable-next-line max-len
const urlIfEmpty = 'https://sun9-69.userapi.com/impg/MFeSZZM1B9l6J1Xg8VqScFB7guu1GN_RSkt4DQ/09X_RuoAaqo.jpg?size=475x600&quality=96&sign=5d1a702454faab96b26762a33af6e210';

describe('imageUrl function:', () => {
  test('should return string', () => {
    expect(typeof imageUrl()).toBe('string');
    expect(typeof imageUrl('b', '123456')).toBe('string');
  });
  test('should return correct value:', () => {
    const point = 'b';
    const id = '123456';
    const url = `http://covers.openlibrary.org/b/${point}/${id}-M.jpg?default=false`;
    const urlEmptyValue = 'http://covers.openlibrary.org/b//-M.jpg?default=false';
    expect(imageUrl()).toBeTruthy();
    expect(imageUrl(point, id)).toBe(url);
    expect(imageUrl()).toBe(urlEmptyValue);
  });
});

describe('imageSize function:', () => {
  const startUrl = 'https://test/isbn/1234567890-M';
  const endUrl = 'https://test/isbn/1234567890-L';
  const size = ['-S', '-M', '-L'];
  test('should return string', () => {
    expect(typeof imageSize()).toBe('string');
    expect(typeof imageSize(startUrl, size[2])).toBe('string');
  });
  test('should return changed url', () => {
    expect(imageSize()).toBeTruthy();
    expect(imageSize()).toBe(urlIfEmpty);
    expect(imageSize(startUrl, size[2])).toBe(endUrl);
  });
});

describe('checkForValid function:', () => {
  const testingArray = [urlIfEmpty];
  const testingObject: bookObject = {
    title: 'title',
    first_publish_year: 2021,
    isbn: ['123', '456'],
    cover_i: 1,
    lccn: ['123'],
    oclc: ['123'],
    author_name: ['123'],
    publisher: ['123'],
  };
  const testingResult = [
    'http://covers.openlibrary.org/b/id/1-M.jpg?default=false',
    'http://covers.openlibrary.org/b/isbn/123-M.jpg?default=false',
    'http://covers.openlibrary.org/b/isbn/456-M.jpg?default=false',
    'http://covers.openlibrary.org/b/lccn/123-M.jpg?default=false',
    'http://covers.openlibrary.org/b/oclc/123-M.jpg?default=false',
    urlIfEmpty,
  ];
  test('should return array of strings', () => {
    expect(typeof checkForValidImageUrls()).toBe('object');
    expect(typeof checkForValidImageUrls()[0]).toEqual(typeof testingArray[0]);
  });
  test('should return changer url', () => {
    expect(checkForValidImageUrls()).toBeTruthy();
    expect(checkForValidImageUrls()).toEqual(testingArray);
    expect(checkForValidImageUrls(testingObject)).toEqual(testingResult);
  });
});
