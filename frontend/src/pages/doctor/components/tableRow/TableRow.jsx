import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import styles from './TableRow.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSpecialistAsync } from '../../../../actions';
import Modal from 'antd/es/modal/Modal';
import { useState } from 'react';
import { selectDoctor, selectUser } from '../../../../selectors';
import { checkAdmin } from '../../../../utilities/checkAdmin';
import { useParams } from 'react-router-dom';

export const TableRow = ({
  specialist,
  setEditSpecialist,
  setIsShowDoctorFrom,
  isShowDoctorFrom,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const params = useParams();

  const handleOk = () => {
    setIsModalOpen(false);
    onDeleteSpecialist();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDeleteSpecialist = () => {
    dispatch(deleteSpecialistAsync(params.id, specialist._id));
  };
  return (
    <>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        Вы действительно хотите удалить?
      </Modal>
      <tr className={styles.tableRow}>
        <td className={styles.textRow}>{specialist.fio}</td>
        <td className={styles.text}>{specialist.experience}</td>
        <td className={styles.text}>{specialist.info}</td>
        <td className={styles.text}>{specialist.uzi}</td>
        <td className={styles.text}>{specialist.additionally}</td>
        <td className={styles.textRow}>{specialist.price}</td>
        <td className={styles.textRow}>{specialist.tel}</td>
        <td
          className={`${styles.textRow} ${checkAdmin(user) ? '' : styles.lastRow}`}
        >
          {specialist.time}
        </td>
        {checkAdmin(user) ? (
          <td className={styles.containerButton}>
            <Button
              className={styles.button}
              onClick={() => {
                setEditSpecialist(specialist);
                setIsShowDoctorFrom(!isShowDoctorFrom);
              }}
            >
              <EditOutlined />
            </Button>
            <Divider />
            <Button
              className={styles.button}
              onClick={() => setIsModalOpen(true)}
            >
              <DeleteOutlined />
            </Button>
          </td>
        ) : null}
      </tr>
    </>
  );
};
