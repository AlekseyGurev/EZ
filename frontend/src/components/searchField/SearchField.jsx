import Paragraph from 'antd/es/skeleton/Paragraph';
import styles from './SearchField.module.css';

export const SearchField = ({ search, setSearch }) => {
  return (
    <fieldset className={styles.container}>
      <label htmlFor="search">
        <span className={styles.label}>Поиск</span>
        <input
          className={styles.input}
          type="text"
          name="search"
          id="search"
          defaultValue={search}
          onChange={({ target }) => {
            setSearch(target.value);
          }}
        />
      </label>
    </fieldset>
  );
};
