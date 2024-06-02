import { Button, Modal, Typography } from 'antd';
import styles from './Note.module.css';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../selectors';
import { useCheckAdmin } from '../../../../useHooks/useCheckAdmin';
import { useState } from 'react';
import { updateNoteAsync } from '../../../../actions/updateNoteAsync';
import { useParams } from 'react-router-dom';
import { deleteNoteAsync } from '../../../../actions/deleteNoteAsync';

export const Note = ({ note }) => {
  const user = useSelector(selectUser);
  const isAdmin = useCheckAdmin(user);
  const dispatch = useDispatch();
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isErrorSend, setIsErrorSend] = useState(false);
  const [updateData, setUpdateData] = useState({
    title: note.title || '',
    text: note.text || '',
    info: note.info || '',
  });

  const onClickEdit = () => {
    isEdit && updateNote(updateData);
    setIsEdit(!isEdit);
  };

  const showModal = (data) => {
    setIsModalOpen(true);
    data && setIsErrorSend(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsErrorSend(false);
  };

  const onChangeField = ({ target }) => {
    setUpdateData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const updateNote = (updateData) => {
    setIsSend(true);
    dispatch(updateNoteAsync(params.id, updateData, note._id)).then((res) => {
      showModal(res.error);
      setIsSend(false);
    });
  };

  const deleteNote = () => {
    setIsSend(true);
    dispatch(deleteNoteAsync(params.id, note._id)).then(() => {
      setIsSend(false);
      setIsModalDelete(false);
    });
  };

  return (
    <li className={styles.container}>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        {isErrorSend ? (
          <p>Ошибка обновления, попробуйте позже</p>
        ) : (
          <p>Заметка обновлена</p>
        )}
      </Modal>
      <Modal
        title=""
        open={isModalDelete}
        onOk={deleteNote}
        closable={false}
        onCancel={() => {
          setIsModalDelete(false);
        }}
      >
        <p>Удалить заметку?</p>
      </Modal>
      {isEdit ? (
        <>
          <input
            className={styles.inputField}
            defaultValue={updateData.title}
            name="title"
            id="title"
            onChange={onChangeField}
          />
          <input
            className={styles.inputField}
            name="text"
            id="text"
            defaultValue={updateData.text}
            onChange={onChangeField}
          ></input>
          <input
            className={styles.inputField}
            name="info"
            id="info"
            defaultValue={updateData.info}
            onChange={onChangeField}
          ></input>
        </>
      ) : (
        <>
          <Typography level={4}>{note.title}</Typography>
          <p className={styles.noteText}>{note.text}</p>
          <p className={styles.noteText}>{note.info}</p>
        </>
      )}

      {isAdmin && (
        <div className={styles.containerButton}>
          <Button onClick={onClickEdit} disabled={isSend}>
            {isEdit ? <CheckCircleOutlined /> : <EditOutlined />}
          </Button>
          <Button
            onClick={() => {
              setIsModalDelete(true);
            }}
            disabled={isSend}
          >
            <DeleteOutlined />
          </Button>
        </div>
      )}
    </li>
  );
};
