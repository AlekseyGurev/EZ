import { useSelector } from 'react-redux';
import { DoctorForm, TableRow } from '../';
import styles from './TableSpecialists.module.css';
import { selectDoctor, selectUser } from '../../../../selectors';
import { Button, Divider, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { checkAdmin } from '../../../../utilities/checkAdmin';
import {
  PAGE_SIZE_SPECIALISTS,
  START_PAGE,
  TABLE_TITLES_SPECIALISTS,
} from '../../../../constants/tables';

export const TableSpecialists = () => {
  const { doctor } = useSelector(selectDoctor);
  const user = useSelector(selectUser);
  const [editSpecialist, setEditSpecialist] = useState('');
  const [isShowDoctorFrom, setIsShowDoctorFrom] = useState(false);
  const [dataSpecialists, setDataSpecialists] = useState('');
  const [currentPage, setCurrentPage] = useState(START_PAGE);
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (doctor) {
      doctor.specialists.length <= PAGE_SIZE_SPECIALISTS &&
        setCurrentPage(START_PAGE);
      const skip = currentPage * PAGE_SIZE_SPECIALISTS - PAGE_SIZE_SPECIALISTS;
      setDataSpecialists(
        doctor.specialists.slice(skip, skip + PAGE_SIZE_SPECIALISTS)
      );
    }
  }, [doctor, currentPage, editSpecialist]);

  return (
    <div className={styles.container}>
      {isShowDoctorFrom || dataSpecialists.length <= 0 ? null : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                {TABLE_TITLES_SPECIALISTS.map((title) => (
                  <th className={styles.tableTitle}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSpecialists &&
                dataSpecialists.map((specialist) => (
                  <TableRow
                    key={specialist._id}
                    specialist={specialist}
                    setCurrentPage={setCurrentPage}
                    setEditSpecialist={setEditSpecialist}
                    setIsShowDoctorFrom={setIsShowDoctorFrom}
                    isShowDoctorFrom={isShowDoctorFrom}
                  />
                ))}
            </tbody>
          </table>
          {doctor.specialists.length > PAGE_SIZE_SPECIALISTS && (
            <div className={styles.paginationContainer}>
              <Pagination
                onChange={(page) => {
                  onChangePage(page);
                }}
                defaultCurrent={currentPage}
                showSizeChanger={false}
                defaultPageSize={PAGE_SIZE_SPECIALISTS}
                total={doctor.specialists.length}
                className={styles.pagination}
              />
            </div>
          )}
        </>
      )}
      {checkAdmin(user) ? (
        <div className={styles.containerForm}>
          <Divider />
          <Button
            wrap
            style={{
              width: '200px',
            }}
            type="primary"
            onClick={() => {
              setIsShowDoctorFrom(!isShowDoctorFrom);
              setEditSpecialist('');
            }}
          >
            {isShowDoctorFrom ? 'Скрыть форму' : 'Добавить врача'}
          </Button>
          {isShowDoctorFrom ? (
            <DoctorForm
              editSpecialist={editSpecialist}
              setIsShowDoctorFrom={setIsShowDoctorFrom}
              isShowDoctorFrom={isShowDoctorFrom}
            />
          ) : null}
          <Divider />
        </div>
      ) : null}
    </div>
  );
};
