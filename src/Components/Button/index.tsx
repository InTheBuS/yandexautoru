import React from 'react';
import styles from './index.module.css';

type Props = {
  text: string,
  handler:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  isDisabled: boolean,
}

const Button: React.FC<Props> = ({ text, handler, isDisabled }: Props) => (
  <button className={styles.ButtonNormal} type="button" onClick={handler} disabled={isDisabled}>
    {text}
  </button>
);

export default Button;
