import { useEffect, useState } from 'react';
import styles from './Users.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../selectors';
import { ROLE } from '../../constants/role';
import { Typography } from 'antd';
import { UserCard } from './components/userCard/UserCard';
import { request } from '../../utilities/request';
import { useCheckAdmin } from '../../useHooks/useCheckAdmin';

export const Users = () => {
  const user = useSelector(selectUser);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const isAdmin = useCheckAdmin(user);

  useEffect(() => {
    isAdmin
      ? navigate('/')
      : request('/api/users').then((data) => {
          setUsers(data.data);
        });
  }, [user]);

  const roles = Object.keys(ROLE)
    .map((role) => {
      return { label: role, value: ROLE[role] };
    })
    .filter((role) => {
      return ROLE.GUEST != role.value;
    });

  const onClickSave = async (id, role) => {
    await request(`/api/users/${id}`, 'PATCH', { role: role.value });
  };

  const onClickDelete = async (id) => {
    await request(`/api/users/${id}`, 'DELETE').then((data) => {
      if (!data.error) {
        setUsers(
          users.filter((user) => {
            return user.id != id;
          })
        );
      }
    });
  };

  return (
    <div className={styles.container}>
      <Typography.Title>Пользователи</Typography.Title>
      <ul className={styles.cardsContainer}>
        {users &&
          users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              roles={roles}
              onClickSave={onClickSave}
              onClickDelete={onClickDelete}
            />
          ))}
      </ul>
    </div>
  );
};
