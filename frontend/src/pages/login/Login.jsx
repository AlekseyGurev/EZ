import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendLogin } from '../../actions';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../actions/setUserData';
import { Input } from '../../components';
import { Button } from 'antd';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorAut, setErrorAuth] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const sendAuth = async (authData) => {
    setIsSend(!isSend);
    const auth = await sendLogin(authData);
    if (!auth.error) {
      Cookies.set('token', auth.token);
      sessionStorage.setItem('userData', JSON.stringify(auth.user));
      dispatch(setUserData(auth.user));
      navigate('/');
      setErrorAuth(!auth.error);
      setIsSend(!isSend);
      reset();
    }
    setErrorAuth(auth.error);
  };

  return (
    <div className={styles.container}>
      <h2>Авторизация</h2>
      <form
        className={styles.containerForm}
        onSubmit={handleSubmit((authData) => sendAuth(authData))}
      >
        <Input name={'login'} register={register} placeholder={'Логин...'} />
        <Input
          name={'password'}
          type="password"
          register={register}
          placeholder={'Пароль...'}
        />
        {errorAut && (
          <span className={styles.error}>Неверный логин или пароль</span>
        )}
        <Button type="link" onClick={() => navigate('/register')}>
          Зарегистрироваться
        </Button>
        <Button type="primary" htmlType="submit" disabled={isSend}>
          Войти
        </Button>
      </form>
    </div>
  );
};
