import './App.css';
import { Header } from './components';
import { Login, Doctors, Doctor, Registration, Users } from './pages';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadDoctorsAsync } from './actions';
import { useEffect, useState } from 'react';
import { Spin, Flex, Alert, Space } from 'antd';
import { setUserData } from './actions/setUserData';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('userData'));

  const dispatch = useDispatch();
  if (user) {
    dispatch(setUserData(user));
  }

  useEffect(() => {
    dispatch(loadDoctorsAsync())
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>
    );
  }
  return (
    <>
      {isError ? (
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Alert message="Ошибка загрузки" type="error" showIcon />
        </Space>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Doctors />} />
            <Route path="/doctor/:id" element={<Doctor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<Doctors />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
