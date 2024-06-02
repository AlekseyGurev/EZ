import { useForm } from 'react-hook-form';
import styles from './DoctorForm.module.css';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { addSpecialistAsync, updateSpecialistAsync } from '../../../../actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ErrorInput, InputArea, Input } from '../../../../components';

export const DoctorForm = ({
  setIsShowDoctorFrom,
  isShowDoctorFrom,
  editSpecialist,
}) => {
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
      fio: editSpecialist.fio || '',
      experience: editSpecialist.experience || '',
      info: editSpecialist.info || '',
      uzi: editSpecialist.uzi || '',
      additionally: editSpecialist.additionally || '',
      price: editSpecialist.price || '',
      tel: editSpecialist.tel || '',
      time: editSpecialist.time || '',
      author: editSpecialist.author || params.id,
    },
  });

  const showModal = (data) => {
    setIsModalOpen(true);
    data && setIsErrorSend(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsErrorSend(false);
    setIsShowDoctorFrom(!isShowDoctorFrom);
  };

  const sendData = async (formData) => {
    setIsSend(true);
    dispatch(
      editSpecialist._id
        ? updateSpecialistAsync(params.id, formData, editSpecialist._id)
        : addSpecialistAsync(params.id, formData)
    ).then((res) => {
      showModal(res.error);
      setIsSend(false);
      reset();
    });
  };

  const fioProps = {
    required: {
      value: true,
      message: 'Поле не должно быть пустым',
    },
  };

  const fioError = errors.fio?.message;

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
          <p>{editSpecialist ? 'Врач обновлен' : 'Врач добавлен'}</p>
        )}
      </Modal>
      <form
        onSubmit={handleSubmit((formData) => sendData(formData))}
        className={styles.containerForm}
      >
        <fieldset className={styles.fieldset}>
          <div className={styles.containerGroup}>
            <Input
              name={'fio'}
              title={'Фио'}
              register={register}
              titleProps={fioProps}
            />
            <Input name={'price'} title={'Цена'} register={register} />
            <Input name={'tel'} title={'Телефон'} register={register} />
            <Input name={'time'} title={' Время'} register={register} />
          </div>
          <ErrorInput titleError={fioError} />
          <Input name={'experience'} title={'Опыт'} register={register} />
          <InputArea name={'info'} title={'Информация'} register={register} />
          <Input name={'uzi'} title={'Узи'} register={register} />
          <InputArea
            name={'additionally'}
            title={'Дополнительно'}
            register={register}
          />
        </fieldset>
        <Button type="primary" htmlType="submit" disabled={isSend}>
          Сохранить
        </Button>
      </form>
    </>
  );
};
