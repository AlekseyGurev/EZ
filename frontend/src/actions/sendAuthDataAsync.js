import { setUserData } from './setUserData';

export const sendAuthDataAsync = (data) => (dispatch) =>
  fetch(`/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(setUserData(data.user));
      }
      return data;
    });
