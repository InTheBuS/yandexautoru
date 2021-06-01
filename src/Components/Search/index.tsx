import React, {
  useCallback, ChangeEvent,
} from 'react';
import styles from './index.module.css';
import { debounce } from '../../Utils/Debounce/Debounce';
import { getBooksType, setBookNameType } from '../App';
import Button from '../Button';
import Input from '../Input';

type Props = {
  bookName: string,
  setBookName: setBookNameType,
  getBooks: getBooksType,
  isFetching: boolean,
}

const Search: React.FC<Props> = ({
  bookName, setBookName, getBooks, isFetching,
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
      <Input handler={onChangeHandler} placeholder="Введите название книги" value={bookName} />
      <Button text="Поиск" handler={onClickHandler} isDisabled={isFetching} />
    </div>
  );
};

export default Search;
