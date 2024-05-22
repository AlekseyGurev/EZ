import styles from './ErrorInput.module.css';

export const ErrorInput = ({ titleError }) => {
  return <span className={styles.error}>{titleError}</span>;
};
