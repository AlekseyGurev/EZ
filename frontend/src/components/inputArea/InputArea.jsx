import styles from './InputArea.module.css';
export const InputArea = ({ name, title, register }) => {
  return (
    <label id={`${name}`} className={styles.titleInput}>
      {title}
      <textarea
        className={styles.textarea}
        name={`${name}`}
        id={`${name}`}
        {...register(`${name}`)}
      />
    </label>
  );
};
