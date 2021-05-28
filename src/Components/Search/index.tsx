import React, {
  useCallback, ChangeEvent, Dispatch, SetStateAction,
} from 'react';
import styles from './index.module.css';
import { debounce } from '../../Utils/Debounce';

type Props = {
  bookName: string,
  setBookName: Dispatch<SetStateAction<string>>,
  getBooks: (name: string, page: number) => void,
}

const Search: React.FC<Props> = ({
  bookName, setBookName, getBooks,
}: Props) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setBookName(event.target.value);
    debouncedOnChangeHandler(event.target.value);
  };
  const onClickHandler = () => {
    getBooks(bookName, 1);
  };

  const debouncedOnChangeHandler = useCallback(debounce((value: string) => getBooks(value, 1), 500), []);

  return (
    <div className={styles.Search}>
      <input className={styles.SearchInput} onChange={onChangeHandler} value={bookName} />
      <button className={styles.SearchButton} type="button" onClick={onClickHandler}>Поиск</button>
    </div>
  );
};

export default Search;
