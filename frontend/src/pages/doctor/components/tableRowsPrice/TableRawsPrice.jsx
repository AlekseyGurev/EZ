import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../selectors';
import { useCheckAdmin } from '../../../../useHooks/useCheckAdmin';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'antd';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import styles from './TableRawsPrice.module.css';
import { deleteServiceAsync, updateServiceAsync } from '../../../../actions';

export const TableRawsPrice = ({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [updateData, setUpdateData] = useState({
    code: service.code || '',
    text: service.text || '',
    price: service.price || '',
    time: service.time || '',
  });
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAdmin = useCheckAdmin(user);
  const params = useParams();

  const onChangeField = ({ target }) => {
    setUpdateData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const updateNote = (updateData) => {
    setIsSend(true);
    dispatch(updateServiceAsync(params.id, updateData, service._id)).then(
      () => {
        setIsSend(false);
      }
    );
  };

  const onClickEdit = () => {
    isEdit && updateNote(updateData);
    setIsEdit(!isEdit);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    onDeleteService();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDeleteService = () => {
    dispatch(deleteServiceAsync(params.id, service._id));
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
        <td className={styles.textRow}>
          {isEdit ? (
            <input
              className={styles.inputField}
              defaultValue={updateData.code}
              name="code"
              id="code"
              onChange={onChangeField}
            />
          ) : (
            service.code
          )}
        </td>
        <td className={styles.textRow}>
          {isEdit ? (
            <input
              className={styles.inputField}
              defaultValue={updateData.text}
              name="text"
              id="text"
              onChange={onChangeField}
            />
          ) : (
            service.text
          )}
        </td>
        <td className={styles.textRow}>
          {isEdit ? (
            <input
              className={styles.inputField}
              defaultValue={updateData.price}
              name="price"
              id="price"
              onChange={onChangeField}
            />
          ) : (
            service.price
          )}
        </td>
        <td className={`${styles.textRow} ${isAdmin ? '' : styles.lastRow}`}>
          {isEdit ? (
            <input
              className={styles.inputField}
              defaultValue={updateData.time}
              name="time"
              id="time"
              onChange={onChangeField}
            />
          ) : (
            service.time
          )}
        </td>
        {isAdmin ? (
          <td className={styles.containerButton}>
            <Button onClick={onClickEdit} disabled={isSend}>
              {isEdit ? <CheckCircleOutlined /> : <EditOutlined />}
            </Button>

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
