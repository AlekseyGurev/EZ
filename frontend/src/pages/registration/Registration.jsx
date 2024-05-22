import styles from './Registration.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../selectors';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ErrorInput, Input } from '../../components';
import { Button } from 'antd';
import { sendAuthDataAsync } from '../../actions/sendAuthDataAsync';

const regFormSchema = yup.object().shape({
  login: yup
    .string()
    .required('Заполните логин')
    .matches(/^\w+$/, 'Неверно заполнен логин. Допускаются буквы и цифры')
    .min(3, 'Минимум 3 символа')
    .max(15, 'Максимум 15 символов'),
  password: yup
    .string()
    .required('Введите пароль')
    .matches(
      /^[\w#%]+$/,
      'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %'
    )
    .min(7, 'Минимум 7 символов')
    .max(20, 'Максимум 15 символов'),
  passcheck: yup
    .string()
    .required('Введите повтор пароль')
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const Registration = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [isSend, setIsSend] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
      passcheck: '',
    },
    resolver: yupResolver(regFormSchema),
  });

  const [errorServer, setErrorServer] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    await dispatch(sendAuthDataAsync(data)).then((data) => {
      sessionStorage.setItem('userData', JSON.stringify(data.user));
      navigate('/');
      reset();
    });
  };

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passcheck?.message;
  const errorMessage = formError || errorServer;

  if (!user) {
    return navigate('/');
  }

  return (
    <div className={styles.container}>
      <h2>Регистрация</h2>
      <form className={styles.containerForm} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="login"
          placeholder="Логин..."
          register={register}
          titleProps={{ onChange: () => setErrorServer(null) }}
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль..."
          register={register}
          titleProps={{
            onChange: () => setErrorServer(null),
          }}
        />
        <Input
          type="password"
          name="passcheck"
          placeholder="Повторите пароль..."
          register={register}
          titleProps={{
            onChange: () => setErrorServer(null),
          }}
        />
        {errorMessage && <ErrorInput titleError={errorMessage} />}
        <Button type="primary" htmlType="submit" disabled={isSend}>
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};
