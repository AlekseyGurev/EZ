import { Button, Modal, Divider, Card } from 'antd';
import { useForm } from 'react-hook-form';
import styles from './Doctors.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectDoctors, selectUser } from '../../selectors';
import { useNavigate } from 'react-router-dom';
import { addDoctorAsync } from '../../actions/addDoctorAsync';
import { checkAdmin } from '../../utilities/checkAdmin';
import { useState } from 'react';
import { ErrorInput } from '../../components/errorInput/ErrorInput';
import { Input } from '../../components';

export const Doctors = () => {
  const [isSend, setIsSend] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorSend, setIsErrorSend] = useState(false);
  const { doctors } = useSelector(selectDoctors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const showModal = (data) => {
    setIsModalOpen(true);
    data && setIsErrorSend(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsErrorSend(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
    },
  });

  const onClickDoctor = (id) => {
    navigate(`/doctor/${id}`);
  };

  const sendData = (formData) => {
    setIsSend(true);
    dispatch(addDoctorAsync(formData)).then((res) => {
      setIsSend(false);
      showModal(res.error);
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
    <div className={styles.container}>
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
          <p>Новая должность врача добавлена</p>
        )}
      </Modal>
      <Card title="Врачи" className={styles.cards}>
        {doctors &&
          doctors.map((doctor) => (
            <Card.Grid
              key={doctor._id}
              className={styles.card}
              onClick={() => onClickDoctor(doctor._id)}
            >
              {doctor.title}
            </Card.Grid>
          ))}
      </Card>
      <Divider />
      {checkAdmin(user) ? (
        <form
          onSubmit={handleSubmit((formData) => sendData(formData))}
          className={styles.formContainer}
        >
          <fieldset className={styles.inputContainer}>
            <Input
              name={'title'}
              title={'Добавить специализацию врача'}
              register={register}
              titleProps={titleProps}
            />
            <ErrorInput titleError={titleError} />
          </fieldset>
          <Button type="primary" htmlType="submit" disabled={isSend}>
            Сохранить
          </Button>
        </form>
      ) : null}
    </div>
  );
};
