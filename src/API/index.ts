import axios, { AxiosResponse } from 'axios';
import { BooksResponse } from '../Redux/Actions/ActionTypes';

class OpenLibraryAPI {
  private baseUrl = 'http://openlibrary.org/search.json';

  async getBooks(bookName: string, page = 1): Promise<AxiosResponse<BooksResponse>> {
    const fixedName = bookName.trim().replace(/\s/g, '+');
    return axios.get<BooksResponse>(`${this.baseUrl}?q=${fixedName}&page=${page}`);
  }
}

export default OpenLibraryAPI;
