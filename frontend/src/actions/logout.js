import { ACTION_TYPE } from './actionTypes';

export const logOut = () => {
  fetch(`/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  return {
    type: ACTION_TYPE.LOGOUT,
  };
};
