import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ErrorInput, Input, InputArea } from '../../../../components';
import { useForm } from 'react-hook-form';
import styles from './PriceForm.module.css';
import { addServiceAsync } from '../../../../actions';

export const PriceForm = ({ toggleForm }) => {
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
      code: '',
      text: '',
      price: '',
      time: '',
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
    dispatch(addServiceAsync(params.id, formData)).then((res) => {
      showModal(res.error);
      setIsSend(false);
      reset();
    });
  };

  const textProps = {
    required: {
      value: true,
      message: 'Поле не должно быть пустым',
    },
  };

  const titleError = errors.text?.message;

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
          <p>Услуга добавлена</p>
        )}
      </Modal>
      <form
        onSubmit={handleSubmit((formData) => sendData(formData))}
        className={styles.containerForm}
      >
        <fieldset className={styles.fieldset}>
          <Input name={'code'} title={'Артикул'} register={register} />
          <Input name={'price'} title={'Цена'} register={register} />
          <Input name={'time'} title={'Время'} register={register} />
          <InputArea
            name={'text'}
            title={'Наименование'}
            register={register}
            titleProps={textProps}
          />
          <ErrorInput titleError={titleError} />
        </fieldset>
        <Button type="primary" htmlType="submit" disabled={isSend}>
          Сохранить
        </Button>
      </form>
    </>
  );
};
