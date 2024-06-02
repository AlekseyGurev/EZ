import { useSelector } from 'react-redux';
import {
  PAGE_SIZE_SERVICES,
  START_PAGE,
  TABLE_TITLES_PRICE,
} from '../../../../constants/tables';
import styles from './TablePrice.module.css';
import { selectDoctor, selectUser } from '../../../../selectors';
import { useCheckAdmin } from '../../../../useHooks/useCheckAdmin';
import { useEffect, useState } from 'react';
import { Button, Divider, Pagination, Typography } from 'antd';
import { PriceForm } from '../priceForm/PriceForm';
import { TableRawsPrice } from '../tableRowsPrice/TableRawsPrice';
import { SearchField } from '../../../../components';

export const TablePrice = () => {
  const { doctor } = useSelector(selectDoctor);
  const user = useSelector(selectUser);
  const isAdmin = useCheckAdmin(user);
  const [isShowServiceFrom, setIsShowServiceFrom] = useState(false);
  const [dataServicesList, setDataServicesLists] = useState('');
  const [currentPage, setCurrentPage] = useState(START_PAGE);
  const [search, setSearch] = useState('');
  const toggleForm = () => {
    setIsShowServiceFrom(!isShowServiceFrom);
  };
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const searchData = (services, search) => {
    return services.filter((service) => service.text.includes(search));
  };

  useEffect(() => {
    if (doctor) {
      doctor.services.length <= PAGE_SIZE_SERVICES &&
        setCurrentPage(START_PAGE);
      const skip = currentPage * PAGE_SIZE_SERVICES - PAGE_SIZE_SERVICES;
      search != ''
        ? setDataServicesLists(
            searchData(doctor.services, search).slice(
              skip,
              skip + PAGE_SIZE_SERVICES
            )
          )
        : setDataServicesLists(
            doctor.services.slice(skip, skip + PAGE_SIZE_SERVICES)
          );
    }
  }, [doctor, currentPage, search]);

  return (
    <div className={styles.container}>
      {isAdmin ? (
        <div className={styles.containerForm}>
          <Divider />
          <Button
            wrap
            style={{
              width: '200px',
            }}
            type="primary"
            onClick={() => {
              setIsShowServiceFrom(!isShowServiceFrom);
            }}
          >
            {isShowServiceFrom ? 'Скрыть форму' : 'Добавить услугу'}
          </Button>
          {isShowServiceFrom ? <PriceForm toggleForm={toggleForm} /> : null}
          <Divider />
        </div>
      ) : null}
      <SearchField search={search} setSearch={setSearch} />
      {dataServicesList.length <= 0 ? (
        <Typography.Title level={4}>
          {search ? 'Ничего не найдено.' : 'В прайсе нет записей.'}
        </Typography.Title>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                {TABLE_TITLES_PRICE.map((title) => (
                  <th className={styles.tableTitle}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataServicesList &&
                dataServicesList.map((service) => (
                  <TableRawsPrice key={service._id} service={service} />
                ))}
            </tbody>
          </table>
          {doctor.services.length > PAGE_SIZE_SERVICES && (
            <div className={styles.paginationContainer}>
              <Pagination
                onChange={(page) => {
                  onChangePage(page);
                }}
                defaultCurrent={currentPage}
                showSizeChanger={false}
                defaultPageSize={PAGE_SIZE_SERVICES}
                total={doctor.services.length}
                className={styles.pagination}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
