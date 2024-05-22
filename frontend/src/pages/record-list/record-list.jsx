import { useState, useEffect } from 'react';
import { Pagination, RecordItem } from './components';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './record-list.module.css';

export const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [countRecords, setCountRecords] = useState('');
  const [searchField, setSearchField] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = '3';
  const navigate = useNavigate();
  const token = Cookies.get('token');

  // useEffect(() => {
  // 	getRecord(currentPage, LIMIT, searchField, token)
  // 		.then((data) => data.json())
  // 		.then((data) => {
  // 			if (data.error) {
  // 				navigate('/login');
  // 			}
  // 			setRecords(data.records);
  // 			setCountRecords(data.countRecords);
  // 		});
  // }, [currentPage, searchField, token, navigate]);

  const lastPage = Math.ceil(countRecords / LIMIT);

  const toFirst = () => {
    setCurrentPage(1);
  };

  const toNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const toPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const toLastPage = () => {
    setCurrentPage(lastPage);
  };

  return (
    <div className={styles.container}>
      <h2>Заявки</h2>
      <fieldset className={styles.search}>
        <label className={styles.searchTitle} htmlFor="search">
          Поиск
        </label>
        <input
          className={styles.searchText}
          type="text"
          name="search"
          id="search"
          value={searchField}
          onChange={(event) => setSearchField(event.target.value)}
        />
      </fieldset>
      {lastPage === 0 ? (
        'Ничего не найдено'
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableItem}>Дата отправки</th>
                <th className={styles.tableItem}>ФИО</th>
                <th className={styles.tableItem}>Телефон</th>
                <th className={styles.tableItemText}>Проблема</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <RecordItem
                  key={record._id}
                  date={record.date}
                  tel={record.tel}
                  fio={record.fio}
                  text={record.text}
                  toFirst={toFirst}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            toFirst={toFirst}
            toNextPage={toNextPage}
            toPrevPage={toPrevPage}
            toLastPage={toLastPage}
          />
        </>
      )}
    </div>
  );
};
