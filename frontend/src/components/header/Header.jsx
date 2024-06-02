import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import styles from './Header.module.css';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logOut } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../selectors';
import { useCheckAdmin } from '../../useHooks/useCheckAdmin';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isAdmin = useCheckAdmin(user);

  const exit = () => {
    Cookies.remove('token');
    sessionStorage.removeItem('userData');
    dispatch(logOut());
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerLogo}>
        <img
          src="https://7010303.ru/local/templates/ezclinic/images/logo.jpg"
          width={150}
          height={35}
          alt="логотип"
        />
      </div>
      <div className={styles.containerButton}>
        {location.pathname != '/' ? (
          <Link to="/">
            <Button>Врачи</Button>
          </Link>
        ) : null}

        {isAdmin ? (
          <Link to="/users">
            <Button>Пользователи</Button>
          </Link>
        ) : null}

        {user.login || location.pathname === '/login' ? null : (
          <Link to="/login">
            <Button>Вход</Button>
          </Link>
        )}

        {user.login ? (
          <div className={styles.exitContainer}>
            <span>{user.login}</span>
            <Button
              onClick={() => {
                exit();
              }}
            >
              Выход
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
