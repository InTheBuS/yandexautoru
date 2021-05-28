import { bookObject } from '../Redux/Actions/ActionTypes';

export function imageUrl(point: string, id: string): string {
  return `http://covers.openlibrary.org/b/${point}/${id}-M.jpg?default=false`;
}

export function imageSize(url: string, size: string): string {
  if (url.match('-M')) {
    return url.replace('-M', `${size}`);
  }
  return url;
}

export function checkForValidImageUrls(possibleUrls: bookObject): string[] {
  const urls: string[] = [];

  if (possibleUrls.cover_i) {
    urls.push(imageUrl('id', `${possibleUrls.cover_i}`));
  }
  if (possibleUrls.isbn) {
    possibleUrls.isbn.forEach((isbn_id: string) => {
      urls.push(imageUrl('isbn', `${isbn_id}`));
    });
  }
  if (possibleUrls.lccn) {
    possibleUrls.lccn.forEach((lccn_id: string) => {
      urls.push(imageUrl('lccn', `${lccn_id}`));
    });
  }
  if (possibleUrls.oclc) {
    possibleUrls.oclc.forEach((oclc_id: string) => {
      urls.push(imageUrl('oclc', `${oclc_id}`));
    });
  }
  // eslint-disable-next-line max-len
  urls.push('https://sun9-69.userapi.com/impg/MFeSZZM1B9l6J1Xg8VqScFB7guu1GN_RSkt4DQ/09X_RuoAaqo.jpg?size=475x600&quality=96&sign=5d1a702454faab96b26762a33af6e210');
  return urls;
}
