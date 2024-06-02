import { Button, Typography } from 'antd';
import styles from './UserCard.module.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';

export const UserCard = ({ roles, user, onClickSave, onClickDelete }) => {
  const [selectedRoleId, setSelectedRoleId] = useState('');

  useEffect(() => {
    user &&
      roles.forEach((element) => {
        if (element.value === user.roleId) {
          setSelectedRoleId(element);
        }
      });
  }, [user]);

  return (
    <li className={styles.container}>
      <Typography.Title level={3}>{user.login}</Typography.Title>
      <Select
        className={styles.select}
        value={selectedRoleId}
        onChange={setSelectedRoleId}
        options={roles}
      />
      <div className={styles.containerButton}>
        <Button
          onClick={() => {
            onClickSave(user.id, selectedRoleId);
          }}
        >
          Сохранить
        </Button>
        <Button
          onClick={() => {
            onClickDelete(user.id);
          }}
        >
          Удалить
        </Button>
      </div>
    </li>
  );
};
