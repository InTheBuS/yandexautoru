import axios, { AxiosResponse } from 'axios';
import { BooksResponse } from '../Redux/Actions/ActionTypes';

class OpenLibraryAPI {
  private baseUrl = 'http://openlibrary.org/search.json';

  async getBooks(bookName: string, page: number): Promise<AxiosResponse<BooksResponse>> {
    const fixedName = bookName.trim().replace(/\s/g, '+');
    console.log(bookName, fixedName, 'imhere');
    const result = await axios.get<BooksResponse>(`${this.baseUrl}?q=${fixedName}&page=${page}`);
    console.log(result, 'result');
    return result;
  }
}

export default OpenLibraryAPI;
