import React from 'react';
import styles from './index.module.css';

type Props = {
  handler:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  placeholder: string,
  value: string,
}

const Input: React.FC<Props> = ({
  handler, placeholder, value,
}: Props) => (
  <input
    className={styles.InputNormal}
    value={value}
    onChange={handler}
    placeholder={placeholder}
  />
);

export default Input;
