import { useEffect, useState } from 'react';
import {
  deleteDoctorAsync,
  loadDoctorAsync,
  updateDoctorAsync,
} from '../../actions';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Flex, Typography, Button, Modal } from 'antd';
import { selectDoctor, selectUser } from '../../selectors';
import { TableSpecialists } from './components';
import styles from './Doctor.module.css';
import { checkAdmin } from '../../utilities/checkAdmin';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

export const Doctor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorLoad, setIsErrorLoad] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const { doctor } = useSelector(selectDoctor);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    dispatch(loadDoctorAsync(params.id))
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsErrorLoad(true);
        setIsLoading(false);
      });
  }, [dispatch]);

  const onEditTitle = () => {
    setEditTitle(doctor.title);
    setIsEdit(true);
  };

  const onEditSave = () => {
    setIsEdit(false);
    dispatch(updateDoctorAsync(params.id, { title: editTitle }));
  };

  const onDeleteDoctor = () => {
    setIsModalOpen(true);
  };

  const onChangeTitle = (e) => {
    setEditTitle(e.target.value);
  };

  const onClickModalOk = () => {
    setIsModalOpen(false);
    dispatch(deleteDoctorAsync(params.id)).then(() => navigate('/'));
  };

  const onClickModalCancel = () => {
    setIsModalOpen(false);
  };

  if (isErrorLoad) {
    return <div>Ошибка загрузки</div>;
  }
  return (
    <>
      {isLoading ? (
        <Flex align="center" justify="center" gap="middle">
          <Spin size="large" />
        </Flex>
      ) : (
        <div className={styles.containerDoctor}>
          <Modal
            title=""
            open={isModalOpen}
            onOk={onClickModalOk}
            onCancel={onClickModalCancel}
            closable={false}
          >
            Вы действительно хотите удалить всю запись?
          </Modal>
          <div className={styles.containerTitle}>
            {isEdit ? (
              <div>
                <input
                  className={styles.input}
                  type="text"
                  value={editTitle}
                  onChange={onChangeTitle}
                />
                <Button onClick={onEditSave}>
                  <CheckCircleOutlined />
                </Button>
              </div>
            ) : (
              <>
                <Typography.Title level={2} className={styles.title}>
                  {doctor.title}
                </Typography.Title>
                {checkAdmin(user) && (
                  <>
                    <Button onClick={onEditTitle}>
                      <EditOutlined />
                    </Button>
                    <Button>
                      <DeleteOutlined onClick={onDeleteDoctor} />
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
          <TableSpecialists />
        </div>
      )}
    </>
  );
};
