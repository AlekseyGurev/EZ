import { useState } from 'react';
import styles from './NoteForm.module.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'antd';
import { ErrorInput, Input, InputArea } from '../../../../components';
import { addNoteAsync } from '../../../../actions/addNoteAsync';

export const NoteForm = ({ toggleForm }) => {
  const [isSend, setIsSend] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorSend, setIsErrorSend] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      text: '',
      info: '',
      author: params.id,
    },
  });

  const showModal = (data) => {
    setIsModalOpen(true);
    data && setIsErrorSend(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsErrorSend(false);
    toggleForm();
  };

  const sendData = async (formData) => {
    setIsSend(true);
    dispatch(addNoteAsync(params.id, formData)).then((res) => {
      showModal(res.error);
      setIsSend(false);
      reset();
    });
  };

  const titleProps = {
    required: {
      value: true,
      message: 'Поле не должно быть пустым',
    },
  };

  const titleError = errors.title?.message;

  return (
    <>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        {isErrorSend ? (
          <p>Ошибка добавления, попробуйте позже</p>
        ) : (
          <p>Заметка добавлена</p>
        )}
      </Modal>
      <form
        onSubmit={handleSubmit((formData) => sendData(formData))}
        className={styles.containerForm}
      >
        <fieldset className={styles.fieldset}>
          <Input
            name={'title'}
            title={'Название'}
            register={register}
            titleProps={titleProps}
          />
          <InputArea name={'text'} title={'Описание'} register={register} />
          <InputArea name={'info'} title={'Информация'} register={register} />
          <ErrorInput titleError={titleError} />
        </fieldset>
        <Button type="primary" htmlType="submit" disabled={isSend}>
          Сохранить
        </Button>
      </form>
    </>
  );
};
